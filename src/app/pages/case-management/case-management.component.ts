import { Component, OnInit, ViewChild } from '@angular/core';
import { RiskyUserService } from '../dashboard/components/riskyUsers/riskyUser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { CaseManagementService } from './case-management.service';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { environment, API_KEY, API_CIPHER } from '../../../environments/environment';
import { json } from 'd3';
import { getUniqueObjectsInArray } from '../../shared/utils/util-functions';
import * as CryptoJS from 'crypto-js';


@Component({
    selector: 'app-case-management',
    templateUrl: './case-management.component.html'
})
export class CaseManagementComponent implements OnInit {

    @ViewChild('incident') incident: Table;
    policyRangeDates: any;
    incidentRangeDates: any;
    selectedItems: any;
    selectedPolicyItems: any;
    allUsers: any = [];
    incidents = [];
    totalRecords: number = 0;
    recordsReturned: number = 0;
    private offset: number = 0;
    fetchingPolicyViolationsInProgress = true;

    shows = [
        { name: 'Last 1 Day', value: '1day' },
        { name: 'Last 2 Day', value: '2day' },
        { name: 'Last 7 Day', value: '7day' },
        { name: 'Last 1 month', value: 'month' }
    ];
    assignee: Array<any> = [];
    status = [
        { name: 'New', value: 'NEW' },
        { name: 'Closed', value: 'CLOSED' },
        { name: 'Perform Remediation', value: 'PERFORM_REMIDIATION' },
        { name: 'In Progress', value: 'IN_PROGRESS' }
    ];
    priority = [
        // { name: 'All', value: 'All' },
        { name: 'Medium', value: 'MEDIUM' },
        { name: 'High', value: 'HIGH' },
        { name: 'Low', value: 'LOW' },
        { name: 'None', value: '-' }
    ];

    @ViewChild('policy') policy: Table;
    @ViewChild('day') day: Table;
    myDays = [];
    policyViolations = [];
    myPolicies: any[] = [];
    selectedIndex = 0;
    criticalItem = 0;
    mediumItem = 0;
    highItem = 0;
    lowItem = 0;
    totalItem = 0;
    todayDate = new Date();
    path: any;

    constructor(private riskyUserService: RiskyUserService, private modalService: NgbModal,
        private caseManagmentService: CaseManagementService, private router: Router, private route: ActivatedRoute) {
        window.scrollTo(0, 0);
        this.offset = 0;
        this.recordsReturned = 0;
        this.myDays.push(this.todayDate);

        for (let dayIndex = 1; dayIndex < 14; dayIndex++) {
            const date = new Date();
            date.setDate(date.getDate() - dayIndex);
            this.myDays.push(date);
        }
    }

    getStageValues() {
        this.criticalItem = this.policyViolations.filter(myPolicy => myPolicy.priority === 'CRITICAL').length;
        this.mediumItem = this.policyViolations.filter(myPolicy => myPolicy.priority === 'MEDIUM').length;
        this.highItem = this.policyViolations.filter(myPolicy => myPolicy.priority === 'HIGH').length;
        this.lowItem = this.policyViolations.filter(myPolicy => myPolicy.priority === 'LOW').length;
        this.totalItem = this.criticalItem + this.mediumItem + this.lowItem + this.highItem;
    }

    ngOnInit() {
        this.route.url.subscribe(url => {
            this.path = (url[0].path);
        });
        this.getPolicyViolations();
        this.getAllIncidents();
    }

    covertDateToUTCFormat(inputDate) {
        const date = new Date(inputDate);
        const _utc = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        return _utc;
    }

    getPolicyViolations() {
        const selectedDate = new Date(this.todayDate);
        const endDate = new Date(this.todayDate);
        selectedDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        this.caseManagmentService.getAllPolicyViolations(selectedDate.getTime(), endDate.getTime(), 0, 1000).subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, API_KEY, API_CIPHER).toString(CryptoJS.enc.Utf8));

            this.policyViolations = res;
            this.policyViolations.forEach((policy: any) => {
                policy.eventDateTimeFormatted = this.covertDateToUTCFormat(policy.eventDateTime);
                policy.generationTimeFormatted = this.covertDateToUTCFormat(policy.generationTime);
            });
            this.fetchingPolicyViolationsInProgress = false;
            this.getStageValues();
        });
    }

    getAllIncidents() {
        const date = new Date();
        const quaterDate = new Date(date.getMonth() - 3);
        const formattedEndDate = date.getUTCFullYear() +
            '-' + (date.getUTCMonth() + 1) +
            '-' + (date.getUTCDate()) +
            ' ' + (date.getUTCHours()) +
            ':' + (date.getUTCMinutes()) +
            ':' + (date.getUTCSeconds());
        const formattedStartDate = quaterDate.getUTCFullYear() +
            '-' + (quaterDate.getUTCMonth() + 1) +
            '-' + (quaterDate.getUTCDate()) +
            ' ' + (quaterDate.getUTCHours()) +
            ':' + (quaterDate.getUTCMinutes()) +
            ':' + (quaterDate.getUTCSeconds());


        this.caseManagmentService.getAllIncidents(0, 1000, encodeURIComponent(formattedStartDate), encodeURIComponent(formattedEndDate)).subscribe((response: any) => {
            response = JSON.parse(CryptoJS.AES.decrypt(response.encryptedData, API_KEY, API_CIPHER).toString(CryptoJS.enc.Utf8));

            let caseOwners: Array<{ name: '', value: '' }> = [];
            response.forEach(element => {
                element.priority = element.priority ? element.priority : '-';
                element.ownerName = element.ownerName ? element.ownerName : 'Not Assigned';
                caseOwners.push({ name: element.ownerName, value: element.ownerName });
            });

            this.incidents = response;
            this.assignee = getUniqueObjectsInArray(caseOwners, 'name');
        });
    }

    daySelected(date, rowIndex) {
        this.fetchingPolicyViolationsInProgress = true;
        this.selectedIndex = rowIndex;
        const selectedDate = new Date(date);
        const endDate = new Date(date);

        selectedDate.setHours(0, 0, 0, 0);
        endDate.setHours(23, 59, 59, 999);
        this.caseManagmentService.getAllPolicyViolations(selectedDate.getTime(), endDate.getTime(), 0, 1000).subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, API_KEY, API_CIPHER).toString(CryptoJS.enc.Utf8));

            this.fetchingPolicyViolationsInProgress = false;
            this.policyViolations = res;
            this.policyViolations.forEach((policy: any) => {
                policy.eventDateTimeFormatted = this.covertDateToUTCFormat(policy.eventDateTime);
                policy.generationTimeFormatted = this.covertDateToUTCFormat(policy.generationTime);
            });
            this.getStageValues();
        });
    }

    incidentFilter(priorityValue: any, filterType: string) {
        if (priorityValue.value)
            this.incident.filter(priorityValue.value.value, filterType, 'contains')
        else
            this.incident.filter('', filterType, 'contains')
    }

    setDateRange() {
        if (this.policyRangeDates.length > 0) {
            this.myDays = [];
            const endDate = new Date(this.policyRangeDates[1]);
            const startDate = new Date(this.policyRangeDates[0]);
            const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            this.myDays.push(endDate);

            for (let dayIndex = 1; dayIndex <= diffDays; dayIndex++) {
                const date = new Date(endDate);
                date.setDate(date.getDate() - dayIndex);
                this.myDays.push(date);
            }
            const selectedDate = new Date(this.policyRangeDates[1]);
            const endDateForService = new Date(this.policyRangeDates[1]);
            selectedDate.setHours(0, 0, 0, 0);
            endDateForService.setHours(23, 59, 59, 999);

            this.caseManagmentService.getAllPolicyViolations(selectedDate.getTime(),
                endDateForService.getTime(), 0, 1000).subscribe((res: any) => {
                    res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, API_KEY, API_CIPHER).toString(CryptoJS.enc.Utf8));

                    this.policyViolations = res;
                    this.fetchingPolicyViolationsInProgress = false;
                    this.getStageValues();
                });
        }
    }

    onActionClick(name, data) {
        const modalRef = this.modalService.open(CaseModalComponent);
        modalRef.componentInstance.name = name;
        modalRef.componentInstance.data = data;
    }

    selectIncidentClick(event) {
        event ? this.incident.filter('NA', 'assignee', 'contains') : this.incident.filter('', 'assignee', 'contains');
    }

    selectPolicyClick(event) {
        event ? this.policy.filter('High', 'priority', 'contains') : this.policy.filter('', 'priority', 'contains');
    }

    fetchEnrichIndexKibanaURL(violationId) {
        event.stopPropagation();
        this.riskyUserService.rawEventCount(violationId)
            .subscribe((res: any) => {
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

    redirectToEntityDetailPage(violationType, entityId) {
        switch (violationType) {
            case 'USER': this.router.navigateByUrl('/riskyUser/' + entityId);
                break;
            case 'IP': this.router.navigateByUrl('/riskyIP/' + entityId);
                break;
            case 'HOST': this.router.navigateByUrl('/riskyHost/' + entityId);
                break;
        }
    }

    redirectToSummaryPage(violationId, eventDateTime, dataAggregated) {
        this.router.navigate(['policyViolationSummary', violationId, eventDateTime, dataAggregated])
    }

}
