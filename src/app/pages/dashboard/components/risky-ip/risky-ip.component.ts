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
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-risky-ip',
    templateUrl: './risky-ip.component.html',
    styleUrls: ['./risky-ip.component.scss']
})
export class RiskyIPComponent implements OnInit {

    selectedIP: string;
    ipDetails: any;
    policyViolations: any;
    graphData: any;

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router) {
    }

    ngOnInit() {

        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIP = params.get('selectedIP');
        });

        this.getRiskyIPDetails();

    }

    getRiskyIPDetails() {
        this.riskyUserService.getRiskyEntityDetails(this.selectedIP, 'IP').subscribe((res: any) => {
            this.ipDetails = res;
        });
        this.riskyUserService.getPolicyViolationForGivenPeriod(this.selectedIP, 0, 0, 0).subscribe((res: any) => {
            if (res && res.length > 0) {
                res.forEach((policyViolation) => {
                    policyViolation.timeLines.forEach((timeLine) => {
                        timeLine['accord'] = false;
                    });
                });
                this.policyViolations = res.reverse();
            }
        });
        this.riskyUserService.getDayBasisRiskScore(this.selectedIP).subscribe( (res: any) => {
            this.graphData = res;
            this.zone.runOutsideAngular(() => {
                // Initialize Bubble chart
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
        this.riskyUserService.fetchEnrichIndexKibanaURL(entityId , violationEventDateTime, ruleId, 'IP')
            .subscribe((urlId: any) => {
                window.open(`${environment.kibanaLink}/goto/${urlId.urlId}`);
            });
    }

}
