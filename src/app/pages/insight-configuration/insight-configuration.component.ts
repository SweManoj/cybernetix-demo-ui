import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';
import { GridApi } from 'ag-grid-community';
import { CrudActionComponent } from '../../shared/renderers/crud-action/crud-action.component';
import { AgCellRendererEvent } from '../../shared/renderers/ag-cell-rendere.event';
import { dateComparator, filterAgGridDates } from '../../shared/ag-grid-date-filters/date-filters';
import { ConfirmationModalComponent } from '../../shared/confirmation-modal/confirmation-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insight-configuration',
  templateUrl: './insight-configuration.component.html',
  styleUrls: ['./insight-configuration.component.scss']
})
export class InsightConfigurationComponent implements OnInit {

  //ag grid 
  gridApi: GridApi;
  columnDefs;
  context;
  frameworkComponents;
  rowData$: Observable<any[]> = of([]);

  myData = [
    { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018' },
    { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018' },
    { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018' },
    { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018' },
    { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018' },
    { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' },
    { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018' }
  ];

  // Ag-Grid Global Filtering
  globalSearchPCKey = '';
  globalSearchPC() {
    this.gridApi.setQuickFilter(this.globalSearchPCKey);
  }

  constructor(private ngbModal: NgbModal, private router: Router) {
    this.context = {
      componentParent: this,
      viewButton: true,
      editButton: true,
      deleteButton: true,
    }

    this.frameworkComponents = {
      crudActionRenderer: CrudActionComponent
    }

    this.initGrid();
    this.rowData$ = of(this.myData);
  }

  ngOnInit() {
  }

  initGrid() {
    this.columnDefs = [{
      headerName: 'Insight Name',
      field: 'insightName',
      filter: 'agTextColumnFilter',
      suppressMenu: true,   // filter condition in the header
      floatingFilterComponentParams: { suppressFilterButton: true }  // filter symbol remove
    },
    {
      headerName: 'Severity',
      field: 'severity',
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Threat Category',
      field: 'threatCategory',
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Insight Type',
      field: 'insightType',
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Author',
      field: 'author',
      filter: 'agTextColumnFilter',
      suppressMenu: true,
      floatingFilterComponentParams: { suppressFilterButton: true }
    },
    {
      headerName: 'Created On',
      field: 'createdOn',
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
    params.api.sizeColumnsToFit();
  }

  handleAgRendererEvent(event: AgCellRendererEvent) {
    const data = event.params.data;
    const insightId = data.insightId;
    console.log(event.type + " event type" + 'data id is : ' + data.insightId);

    switch (event.type) {
      case AgCellRendererEvent.VIEW_EVENT:
        this.viewInsightConfiguration(insightId);
        break;
      case AgCellRendererEvent.EDIT_EVENT:
        this.editInsightConfiguration(insightId);
        break;
      case AgCellRendererEvent.DELETE_EVENT:
        this.deletePolicyConfig(data.insightId);
        break;
    }
  }

  onRowSelected() {
  }

  addInsightConfiguration() {
    this.router.navigate(['/addInsightConfiguration'])
  }

  editInsightConfiguration(insightId) {
    this.router.navigateByUrl('/editInsightConfiguration/' + insightId);
  }

  viewInsightConfiguration(insightId) {
    this.router.navigate(['/viewtInsightConfiguration', insightId]);
  }

  deletePolicyConfig(insightId: number) {
    const activeModal = this.ngbModal.open(ConfirmationModalComponent, { size: 'sm' });
    activeModal.componentInstance.message = 'Are you sure you want to delete?';
    activeModal.result;
  }

  uploadFile(files: FileList) {
    // console.log('item name : ' + files.item.name);
    const fileName = files.item[0];
    window.alert('file name is : ' + fileName);
    /*  const policyStringifiedData = JSON.stringify({ 'incidentEntityId': this.incidentDetails.incId });
     this.incidentSummaryService.uploadIncidentSummaryAttachment(this.fileToUpload, policyStringifiedData).subscribe((res: any) => {
         this.incidentDetails.attachFiles.push(res);
         this.saveIncidentActivity('uploaded ' + res.fileName + ' file.', 'FILE_UPLOADED');
         this._snackBar.open('File uploaded successfully', null, {
             duration: 2000,
         });
     }); */
  }

}
