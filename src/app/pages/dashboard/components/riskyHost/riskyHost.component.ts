import { Component, NgZone, OnInit, AfterContentInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskyUserService } from '../riskyUsers/riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskScoreModalComponent } from '../riskyUsers/risk-score-modal/risk-score-modal.component';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import * as am4charts from '@amcharts/amcharts4/charts';
import { environment } from '../../../../../environments/environment';
import { CaseManagementService } from '../../../case-management/case-management.service';
import { MatSnackBar } from '@angular/material';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-riskyHost',
    templateUrl: './riskyHost.component.html',
    styleUrls: ['./riskyHost.component.scss']
})
export class RiskyHostComponent implements OnInit {

    API_KEY: any;
    API_CIPHER: any;

    selectedHost: string;
    hostDetails: any;
    policyViolations: any;
    graphData: any;

    actionButtonName = '';

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private _snackBar: MatSnackBar,
        private routeParam: ActivatedRoute, private modalService: NgbModal, private caseManagementService: CaseManagementService,
        private zone: NgZone, private router: Router) {

        this.API_KEY = environment.API_KEY;
        this.API_CIPHER = environment.API_CIPHER;

        window.scrollTo(0, 0);
    }



    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedHost = params.get('selectedHost');
            this.getRiskyHostDetails();
        });
    }

    actionButtonClick(policyViolation: any) {
        if (this.actionButtonName != "Create an Incident")
            this.router.navigate(['/incidentSummary', policyViolation.incidentId]);

        var categories: Array<string[]> = [];
        var ruleIds: Array<number[]> = [];
        var violationIds: Array<number[]> = [];

        policyViolation.timeLines.forEach(timeLine => {
            categories.push(timeLine.subCategory);
            ruleIds.push(timeLine.ruleId);
            violationIds.push(timeLine.lastViolationId);
        });

        const requestBody = {
            category: categories,
            entityId: policyViolation.entityId,
            entityType: 'IP',
            eventDate: policyViolation.violationEventDate,
            ruleIds: ruleIds,
            violationIds: violationIds
        };
        console.log('request body : ' + requestBody);
        this.riskyUserService.newIncidentCreation(requestBody).subscribe(res => {

        });
    }

    initializeLineChart() {

        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("lineChartDiv", am4charts.XYChart);
        chart.paddingRight = 20;
        chart.data = this.graphData;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "riskScore";
        series.strokeWidth = 2;
        series.tooltipText = "Risk Score: {valueY}";

        // set stroke property field
        series.propertyFields.stroke = "color";

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = scrollbarX;

    }

    stylePolicyActionButton(policyButtonName: string) {
        // AI Incident Created, Manual Incident Created, Create an Incident  - Incident Button Name Possibilities
        if (policyButtonName == 'AI Incident Created')
            return { background: 'darkblue', color: 'white' };
        else
            return { background: 'darkyellow', color: 'white' };
    }

    getRiskyHostDetails() {
        this.riskyUserService.getRiskyEntityDetails(this.selectedHost, 'HOST').subscribe((res: any) => {
            // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            res.riskScore = Math.round(res.riskScore);
            this.hostDetails = res;
        });
        const date = new Date()
        this.riskyUserService.getPolicyViolationForGivenPeriod(this.selectedHost, 0, date.getTime(), 0).subscribe((res: any) => {
            // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));

            if (res && res.length > 0) {
                res.forEach((policyViolation) => {
                    if (policyViolation.shouldShowIncidentCreationOption) {
                        if (policyViolation.autoIncidentCreated) {
                            policyViolation.actionButtonName = "AI Incident Created";
                        } else if (policyViolation.incidentCreated) {
                            policyViolation.actionButtonName = "Manual Incident Created";
                        } else {
                            policyViolation.actionButtonName = "Create an Incident";
                        }
                    }
                    policyViolation.timeLines.forEach((timeLine) => {
                        timeLine['accord'] = false;
                    });
                });
                this.policyViolations = res.reverse();
            }
        });

        this.riskyUserService.getDayBasisRiskScore(this.selectedHost).subscribe((res: any) => {
            // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            this.graphData = res;
            this.zone.runOutsideAngular(() => {
                this.initializeLineChart();
            });
        });
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65)
            return "greenyellow";
        else if (riskScore > 65 && riskScore <= 79)
            return "darkorange";
        else
            return "crimson";
    }

    open(ruilId, userId, isotimestamp) {
        const modalRef = this.modalService.open(RiskScoreModalComponent, { backdrop: 'static' }); // { size: 'sm' }
        modalRef.componentInstance.ruilId = ruilId;
        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.isotimestamp = isotimestamp;
    }

    gotoSummery() {
        //window.open("#/policyViolationSummary", '_blank');
    }

    fetchEnrichIndexKibanaURL(entityId, violationEventDateTime, ruleId) {
        this.riskyUserService.fetchEnrichIndexKibanaURL(entityId, encodeURIComponent(violationEventDateTime), ruleId, 'HOST')
            .subscribe((res: any) => {
                // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

    fetchKibanaRawEventindex(lastViolationId) {
        /* this.riskyUserService.fetchKibanaRawEventindex(entityId, 'HOST', enrichEventIds)
            .subscribe((res: any) => {
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            }); */

        this.riskyUserService.rawEventCount(lastViolationId)
            .subscribe((res: any) => {
                // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

    createIncident(violation) {

        const date = new Date(violation.violationEventTime);
        const incidentData = {
            'status': 'NEW',
            "entityId": this.selectedHost,
            "ruleId": violation.ruleId,
            "violationEventDate": date.toISOString().substring(0, 10),
            "violationEventTime": date.toISOString().substring(0, 19)
        };
        this.caseManagementService.createIncident(incidentData).subscribe((res: any) => {
            // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            this._snackBar.open('Created Incident successfully', null, {
                duration: 2000,
            });
        });
    }
}
