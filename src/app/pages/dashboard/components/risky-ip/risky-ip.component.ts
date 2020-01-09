import { Component, NgZone, OnInit, AfterContentInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskyUserService } from '../riskyUsers/riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from '@amcharts/amcharts4/charts';
import { bubbleDataMonth } from '../riskyUsers/data';
import { RiskScoreModalComponent } from '../riskyUsers/risk-score-modal/risk-score-modal.component';
import { environment } from '../../../../../environments/environment';
import { CaseManagementService } from '../../../case-management/case-management.service';
import { MatSnackBar } from '@angular/material';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-risky-ip',
    templateUrl: './risky-ip.component.html',
    styleUrls: ['./risky-ip.component.scss']
})
export class RiskyIPComponent implements OnInit {

    API_KEY: any;
    API_CIPHER: any;

    selectedIP: string;
    ipDetails: any;
    policyViolations: any;
    graphData: any;

    actionButtonName = '';

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router, private caseManagementService: CaseManagementService
        , private _snackBar: MatSnackBar) {

        this.API_KEY = environment.API_KEY;
        this.API_CIPHER = environment.API_CIPHER;

        window.scrollTo(0, 0);
    }

    ngOnInit() {

        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIP = params.get('selectedIP');
        });

        this.getRiskyIPDetails();
    }

    stylePolicyActionButton(policyButtonName: string) {
        // AI Incident Created, Manual Incident Created, Create an Incident  - Incident Button Name Possibilities
        if (policyButtonName == 'AI Incident Created')
            return { background: 'darkblue', color: 'white' };
        else
            return { background: 'darkyellow', color: 'white' };
    }
    
    getRiskyIPDetails() {
        this.riskyUserService.getRiskyEntityDetails(this.selectedIP, 'IP').subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            res.riskScore = Math.round(res.riskScore);
            this.ipDetails = res;
        });
        const date = new Date();
        this.riskyUserService.getPolicyViolationForGivenPeriod(this.selectedIP, 0, date.getTime(), 0).subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));

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

        this.riskyUserService.getDayBasisRiskScore(this.selectedIP).subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            this.graphData = res;
            this.zone.runOutsideAngular(() => {
                // Initialize Bubble chart
                this.initializeLineChart();
            });
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

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65)
            return "greenyellow";
        else if (riskScore > 65 && riskScore <= 79)
            return "darkorange";
        else
            return "crimson";
    }

    initializeLineChart() {

        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("lineChartDiv", am4charts.XYChart);
        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        let previousValue;

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        chart.data = this.graphData;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        dateAxis.renderer.axisFills.template.disabled = true;
        dateAxis.renderer.ticks.template.disabled = true;
        dateAxis.dateFormats.setKey("day", "MMM dd, yyyy");
        dateAxis.periodChangeDateFormats.setKey("day", "MMM dd, yyyy");

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
        valueAxis.renderer.axisFills.template.disabled = true;
        valueAxis.renderer.ticks.template.disabled = true;

        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "riskScore";
        series.strokeWidth = 2;
        series.tooltipText = "Risk Score : {valueY}";
        // series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#2D93AD");
        series.tooltip.autoTextColor = false;
        series.tooltip.label.fill = am4core.color("black");

        // set stroke property field
        series.propertyFields.stroke = "color";

        chart.cursor = new am4charts.XYCursor();
        let scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = scrollbarX;

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
        this.riskyUserService.fetchEnrichIndexKibanaURL(entityId, encodeURIComponent(violationEventDateTime), ruleId, 'IP')
            .subscribe((res: any) => {
                res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

    fetchKibanaRawEventindex(lastViolationId) {
        /* this.riskyUserService.fetchKibanaRawEventindex(entityId, 'IP', enrichEventIds)
            .subscribe((res: any) => {
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            }); */

        this.riskyUserService.rawEventCount(lastViolationId)
            .subscribe((res: any) => {
                res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

    createIncident(violation) {

        const date = new Date(violation.violationEventTime);

        console.log(date.toISOString().substring(0, 19));

        const incidentData = {
            'status': 'NEW',
            "entityId": this.ipDetails.entityId,
            "ruleId": violation.ruleId,
            "violationEventDate": date.toISOString().substring(0, 10),
            "violationEventTime": date.toISOString().substring(0, 19)
        };

        this.caseManagementService.createIncident(incidentData).subscribe((res: any) => {
            res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));

            this._snackBar.open('Created Incident successfully', null, {
                duration: 2000,
            });
            if (res) {
                const parsedRes = JSON.parse(res);
                violation.incId = parsedRes.incId;
                violation.pvId = parsedRes.pvID;
            }
        });
    }

}
