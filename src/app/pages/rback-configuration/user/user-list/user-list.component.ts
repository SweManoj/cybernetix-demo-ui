import { Component, OnInit, NgZone } from '@angular/core';
import { ConfirmationModalComponent } from '../../../../shared/confirmation-modal/confirmation-modal.component';
import { Observable, of } from 'rxjs';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CrudActionComponent } from '../../../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../../../shared/renderers/ag-cell-rendere.event';
import { filterAgGridDates, dateComparator } from '../../../../shared/ag-grid-date-filters/date-filters';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  //ag grid 
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  columnDefs;
  context;
  frameworkComponents;
  getRowHeight;
  rowData$: Observable<any[]> = of([]);

  selectedUserIds: number[] = [];

  userList = [
    { userId: 1, userName: "Anil_Erla", email: 'anil.erla@cybernetix.ai', status: 'Activate', createdBy: 'Anil Erla', createdOn: '12-12-2019' },
    { userId: 2, userName: "Abhi M", email: 'abhiM@cybernetix.ai', status: 'Activate', createdBy: 'Abhi M', createdOn: '26-12-2018' },
    { userId: 3, userName: "Nitin Tyagi", email: 'nitin.tyagi@cybernetix.ai', status: 'Activate', createdBy: 'Vivek', createdOn: '01-05-2018' },
    { userId: 4, userName: "Sachin Shetty", email: 'sachin.shetty@cybernetix.ai', status: 'Deactivate', createdBy: 'Abhi M', createdOn: '01-05-2018' },
    { userId: 5, userName: "Shilpha", email: 'shilpa@cybernetix.ai', status: 'Activate', createdBy: 'Abhi M', createdOn: '19-12-2018' },
    { userId: 6, userName: "Vivek", email: 'vivek@cybernetix.ai', status: 'Deactivate', createdBy: 'Anil Erla', createdOn: '01-12-2019' }
  ];

  // Ag-Grid Global Filtering
  globalSearchUserKey = '';
  globalSearchUser() {
    this.gridApi.setQuickFilter(this.globalSearchUserKey);
  }

  constructor(private ngbModal: NgbModal, private router: Router, private activateRoute: ActivatedRoute,
    private ngZone: NgZone) {

    window.scrollTo(0, 0);
    this.context = {
      componentParent: this,
      viewButton: true,
      editButton: true,
      deleteButton: true,
      copyButton: false
    }

    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }

    this.initGrid();
    this.rowData$ = of(this.userList);
  }

  ngOnInit() {
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
      headerName: 'Status',
      field: 'status',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Created By',
      field: 'createdBy',
      sortable: true,
      resizable: true,
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Created On',
      field: 'createdOn',
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
    }
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

  deleteUser(insightId: number) {
    const activeModal = this.ngbModal.open(ConfirmationModalComponent, { size: 'sm' });
    activeModal.componentInstance.message = 'Are you sure you want to delete?';
    activeModal.result;
  }

}
