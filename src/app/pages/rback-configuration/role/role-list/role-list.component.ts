import { Component, OnInit, NgZone } from '@angular/core';
import { ConfirmationModalComponent } from '../../../../shared/confirmation-modal/confirmation-modal.component';
import { AgCellRendererEvent } from '../../../../shared/renderers/ag-cell-rendere.event';
import { dateComparator, filterAgGridDates } from '../../../../shared/ag-grid-date-filters/date-filters';
import { CrudActionComponent } from '../../../../shared/renderers/crud-action/crud-action.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  //ag grid 
  gridApi: GridApi;
  gridColumnApi: ColumnApi;
  columnDefs;
  context;
  frameworkComponents;
  getRowHeight;
  rowData$: Observable<any[]> = of([]);

  selectedRoleIds: number[] = [];

  roleList = [
    { roleId: 1, roleName: "ROLE_ADMIN", createdBy: 'Anil Erla', createdOn: '12-12-2019' },
    { roleId: 2, roleName: "ROLE_USER", createdBy: 'Sachin Shetty', createdOn: '01-12-2019' },
    { roleId: 3, roleName: "ROLE_ANALYST", createdBy: 'Nitin Tyagi', createdOn: '11-12-2018' },
    { roleId: 4, roleName: "ROLE_USER", createdBy: 'Abhishek M', createdOn: '19-12-2018' },
    { roleId: 5, roleName: "ROLE_ADMIN", createdBy: 'Vivek', createdOn: '23-12-2018' },
    { roleId: 6, roleName: "ROLE_ANALYSTN1", createdBy: 'Shilpha', createdOn: '17-10-2018' },
    { roleId: 7, roleName: "ROLE_USER", createdBy: 'Agarwal', createdOn: '24-08-2018' },
    { roleId: 8, roleName: "ROLE_ADMIN", createdBy: 'Anil Erla', createdOn: '01-05-2018' },
    { roleId: 9, roleName: "ROLE_USER", createdBy: 'Manoj Kumar', createdOn: '29-09-2018' },
    { roleId: 10, roleName: "ROLE_ANALYST", createdBy: 'Nitin Tyagi', createdOn: '26-12-2018' },
    { roleId: 11, roleName: "ROLE_ADMIN", createdBy: 'Sachin Shetty', createdOn: '12-03-2018' },
    { roleId: 12, roleName: "ROLE_USER", createdBy: 'Rohit', createdOn: '24-08-2018' }
  ];

  // Ag-Grid Global Filtering PC-PolicyConfiguration
  globalSearchRoleKey = '';
  globalSearchRole() {
    this.gridApi.setQuickFilter(this.globalSearchRoleKey);
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
    this.rowData$ = of(this.roleList);
  }

  ngOnInit() {
  }

  initGrid() {
    this.columnDefs = [{
      headerName: 'Role Name',
      field: 'roleName',
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      /* cellRenderer: "agGroupCellRenderer",
      cellRendererParams: { checkbox: true }, */
      sortable: true,  // by default false
      resizable: true,  // by default false
      filter: 'agTextColumnFilter',
      suppressMenu: true,   // filter condition in the header
      floatingFilterComponentParams: { suppressFilterButton: true },  // filter symbol remove
      cellStyle: () => ({ color: '#099bb5' })
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
    const roleId = data.roleId;

    switch (event.type) {
      case AgCellRendererEvent.VIEW_EVENT:
        this.viewRole(roleId);
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.editRole(roleId);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deleteRole(data.roleId);
        break;
    }
  }

  onRowSelected() {
    this.ngZone.run(() => {
      this.selectedRoleIds = [];
      const selectedRoles: any[] = this.gridApi.getSelectedRows();

      for (let i = 0; i < selectedRoles.length; i++)
        this.selectedRoleIds.push(selectedRoles[i].roleId);
    });
  }

  addRole() {
    this.ngZone.run(() => {
      this.router.navigate(['../addRole'], { relativeTo: this.activateRoute });
    });
  }

  editRole(roleId) {
    this.ngZone.run(() => {
      this.router.navigate(['../editRole', roleId], { relativeTo: this.activateRoute });
    });
  }

  viewRole(roleId) {
    this.ngZone.run(() => {
      this.router.navigate(['../viewRole', roleId], { relativeTo: this.activateRoute });
    });
  }

  deleteRole(roleId: number) {
    const activeModal = this.ngbModal.open(ConfirmationModalComponent, { size: 'sm' });
    activeModal.componentInstance.message = 'Are you sure you want to delete?';
    activeModal.result;
  }

}
