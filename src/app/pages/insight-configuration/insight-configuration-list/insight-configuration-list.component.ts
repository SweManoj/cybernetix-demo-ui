import { Component, OnInit, NgZone } from '@angular/core';
import { of, Observable } from 'rxjs';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudActionComponent } from '../../../shared/renderers/crud-action/crud-action.component';
import { dateComparator, filterAgGridDates } from '../../../shared/ag-grid-date-filters/date-filters';
import { AgCellRendererEvent } from '../../../shared/renderers/ag-cell-rendere.event';
import { ConfirmationModalComponent } from '../../../shared/confirmation-modal/confirmation-modal.component';

@Component({
    selector: 'app-insight-configuration',
    templateUrl: './insight-configuration-list.component.html',
    styleUrls: ['./insight-configuration-list.component.scss']
})
export class InsightConfigurationListComponent implements OnInit {

    //ag grid 
    gridApi: GridApi;
    gridColumnApi: ColumnApi;
    columnDefs;
    context;
    frameworkComponents;
    getRowHeight;
    rowData$: Observable<any[]> = of([]);

    selectedInsightsIds: number[] = [];

    myData = [
        { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018', enable: 'true' },
        { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'false' },
        { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018', enable: 'false' },
        { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018', enable: 'false' },
        { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'false' },
        { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018', enable: 'true' },
        { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'false' },
        { insightId: 1, insightName: "IN1", severity: 'SE1', threatCategory: 'TC1', insightType: 'Basic', author: 'Manoj Kumar', createdOn: '01-12-2018', enable: 'true' },
        { insightId: 2, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'true' },
        { insightId: 3, insightName: "IN2", severity: 'SE2', threatCategory: 'TC2', insightType: 'Expert', author: 'Sachin Shetty', createdOn: '02-12-2018', enable: 'false' }
    ];

    // Ag-Grid Global Filtering
    globalSearchPCKey = '';
    globalSearchPC() {
        this.gridApi.setQuickFilter(this.globalSearchPCKey);
    }

    constructor(private ngbModal: NgbModal, private router: Router, private activateRoute: ActivatedRoute,
        private ngZone: NgZone) {
        this.context = {
            componentParent: this,
            viewButton: true,
            editButton: true,
            deleteButton: true,
        }

        this.frameworkComponents = {
            crudActionRenderer: CrudActionComponent
        }

        this.myData.forEach(data => {
            data.enable = data.enable == 'true' ? 'YES' : 'NO';
        })
        this.initGrid();
        this.rowData$ = of(this.myData);

        this.getRowHeight = function (params) {
            return 28 * (Math.floor(params.data.author.length / 60) + 3);
        };
    }

    ngOnInit() {
        console.log('count is : ' + this.selectedInsightsIds.length);
    }

    initGrid() {
        this.columnDefs = [{
            headerName: 'Insight Name',
            field: 'insightName',
            headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
            /* cellRenderer: "agGroupCellRenderer",
            cellRendererParams: { checkbox: true }, */
            sortable: true,  // by default false
            resizable: false,  // by default false
            filter: 'agTextColumnFilter',
            suppressMenu: true,   // filter condition in the header
            floatingFilterComponentParams: { suppressFilterButton: true }  // filter symbol remove
        },
        {
            headerName: 'Severity',
            field: 'severity',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilterComponentParams: { suppressFilterButton: true }
        },
        {
            headerName: 'Threat Category',
            field: 'threatCategory',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilterComponentParams: { suppressFilterButton: true }
        },
        {
            headerName: 'Insight Type',
            field: 'insightType',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilterComponentParams: { suppressFilterButton: true }
        },
        {
            headerName: 'Author',
            field: 'author',
            sortable: true,
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
            headerName: 'Enable',
            field: 'enable',
            sortable: true,
            filter: 'agTextColumnFilter',
            suppressMenu: true,
            floatingFilterComponentParams: { suppressFilterButton: true },
            // valueFormatter: params => params.value ? 'YES' : 'NO',
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
        const insightId = data.insightId;

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
        this.ngZone.run(() => {
            this.selectedInsightsIds = [];
            const selectedInsights: any[] = this.gridApi.getSelectedRows();

            for (let i = 0; i < selectedInsights.length; i++)
                this.selectedInsightsIds.push(selectedInsights[i].insightId);
        });
    }

    addInsightConfiguration() {
        this.ngZone.run(() => {
            this.router.navigate(['addInsightConfiguration'], { relativeTo: this.activateRoute });
        });
    }

    editInsightConfiguration(insightId) {
        this.ngZone.run(() => {
            this.router.navigate(['editInsightConfiguration', insightId], { relativeTo: this.activateRoute });
        });
    }

    viewInsightConfiguration(insightId) {
        this.ngZone.run(() => {
            this.router.navigate(['viewInsightConfiguration', insightId], { relativeTo: this.activateRoute });
        });
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
