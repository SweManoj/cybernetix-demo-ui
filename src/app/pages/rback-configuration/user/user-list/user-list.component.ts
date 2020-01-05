import { Component, OnInit, NgZone } from '@angular/core';
import { ConfirmationModalComponent } from '../../../../shared/confirmation-modal/confirmation-modal.component';
import { Observable, of } from 'rxjs';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudActionComponent } from '../../../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../../../shared/renderers/ag-cell-rendere.event';
import { filterAgGridDates, dateComparator } from '../../../../shared/ag-grid-date-filters/date-filters';
import { UserService } from '../user-service';
import { environment } from '../../../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  API_KEY: any;
  API_CIPHER: any;

  //ag grid 
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  columnDefs;
  context;
  frameworkComponents;
  getRowHeight;
  userList: Observable<any[]> = of([]);

  selectedUserIds: number[] = [];

  // Ag-Grid Global Filtering
  globalSearchUserKey = '';
  globalSearchUser() {
    this.gridApi.setQuickFilter(this.globalSearchUserKey);
  }

  constructor(private ngbModal: NgbModal, private router: Router, private activateRoute: ActivatedRoute,
    private ngZone: NgZone, private userService: UserService, private _snackBar: MatSnackBar) {

    window.scrollTo(0, 0);
    this.API_KEY = environment.API_KEY;
    this.API_CIPHER = environment.API_CIPHER;

    this.context = {
      componentParent: this,
      viewButton: true,
      editButton: true,
      deleteButton: true,
      copyButton: false,
      changePasswordButton: true
    }

    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }

    this.initGrid();
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((users: any) => {
      users = JSON.parse(CryptoJS.AES.decrypt(users.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
      users.forEach(user => {
        user.createdby = user.createdby ? user.createdby : '-';
        user.distinctRoles = user.distinctRoles.length > 0 ? user.distinctRoles : '-';
        user.email = user.email ? user.email : '-'
      });
      this.userList = of(users);
    });
  }

  initGrid() {
    this.columnDefs = [{
      headerName: 'User Name',
      field: 'userName',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      sortable: true,  // by default false
      resizable: true,  // by default false
      filter: 'agTextColumnFilter',
      suppressMenu: true,   // filter condition in the header
      floatingFilterComponentParams: { suppressFilterButton: true },  // filter symbol remove
      cellStyle: () => ({ color: '#099bb5' })
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Roles',
      field: 'distinctRoles',
      sortable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Status',
      field: 'enabled',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Created By',
      field: 'createdby',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Created On',
      field: 'createdDate',
      sortable: true,
      resizable: false,
      comparator: dateComparator,
      filter: "agDateColumnFilter",
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true },
      filterParams: {
        comparator: filterAgGridDates
      }
    },
    {
      headerName: 'Action',
      cellRenderer: 'crudActionRenderer'
    }
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.hideOverlay();

    params.api.sizeColumnsToFit();
    this.gridColumnApi.autoSizeColumn('Action');
    // this.gridColumnApi.autoSizeColumns(['Action']);
  }

  handleAgRendererEvent(event: AgCellRendererEvent) {
    const data = event.params.data;
    const userId = data.userId;

    switch (event.type) {
      case AgCellRendererEvent.VIEW_EVENT:
        this.viewUser(userId);
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.editUser(userId);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteUser(data.userId);
        break;
      case AgCellRendererEvent.CHANGE_PASSWORD:
        this.changePassword(data);
        break;
    }
  }

  changePassword(data) {

  }

  onRowSelected() {
    this.ngZone.run(() => {
      this.selectedUserIds = [];
      const selectedUsers: any[] = this.gridApi.getSelectedRows();

      for (let i = 0; i < selectedUsers.length; i++)
        this.selectedUserIds.push(selectedUsers[i].userId);
    });
  }

  addUser() {
    this.ngZone.run(() => {
      this.router.navigate(['../addUser'], { relativeTo: this.activateRoute });
    });
  }

  editUser(userId) {
    this.ngZone.run(() => {
      this.router.navigate(['../editUser', userId], { relativeTo: this.activateRoute });
    });
  }

  viewUser(userId) {
    this.ngZone.run(() => {
      this.router.navigate(['../viewUser', userId], { relativeTo: this.activateRoute });
    });
  }

  deleteUser(userId: number) {
    const activeModal = this.ngbModal.open(ConfirmationModalComponent, { size: 'sm' });
    activeModal.componentInstance.message = 'Are you sure you want to delete?';
    activeModal.result.then(res => {
      if (res == 'Y') {
        this.userService.deleteUserByAdmin(userId).subscribe(res => {
          this._snackBar.open('User Deleted Successfully', null, {
            duration: 4000,
          });
          this.ngOnInit();
        })
      }
    });
  }

}
