import { Component, NgZone, OnInit, AfterContentInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskyUserService } from '../riskyUsers/riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskScoreModalComponent } from '../riskyUsers/risk-score-modal/risk-score-modal.component';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from '@amcharts/amcharts4/charts';
import { AWS_S3_Instance01_data, DESK_10982_data, DESK_1456_data, DESK_1576_data, WK_1929304D_data } from './data';
import { PerformRemediationService } from '../../../../core/services/perform-remediation.service';

@Component({
    selector: 'app-riskyHost',
    templateUrl: './riskyHost.component.html',
    styleUrls: ['./riskyHost.component.scss']
})
export class RiskyHostComponent implements OnInit {

    selectedHost: string;
    hostDetails: any;

    hostAddressData = [
        { type: 'host', value: 'AWS-S3-Instance01', score: 98, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-10982', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-1456', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-1576', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'WK-1929304D', score: 93, img: false, location: 'San Diego', lastSeen: '14 Oct 2019 03:22:00', peer: 212, lastSeenUser: 'Chen_Zhang' },

        // unused hosts
        { type: 'host', value: 'PUNDESK001', score: 30, img: false, location: 'Munich, Germany', lastSeen: '23 Jun 2019 03:22:00', peer: 2, lastSeenUser: 'PAV58329' },
        { type: 'host', value: 'USADESK25', score: 89, img: false, location: 'Amsterdam, Netherlands ', lastSeen: '21 Jun 2019 17:10:00', peer: 3, lastSeenUser: 'NEI89321' },
        { type: 'host', value: 'CHNLAP963', score: 66, img: false, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { type: 'host', value: 'LONDESK588', score: 95, img: false, location: 'Beijing, China', lastSeen: '27 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { type: 'host', value: 'AUSLAP4873', score: 90, img: false, location: 'Sydney, Australia', lastSeen: '14 Aug 2019 17:23:12', peer: 23, lastSeenUser: 'AndrewsStarc1' },
        { type: 'host', value: 'AWS-DomainEC2-Instance07', score: 92, img: false, location: 'San Diego', lastSeen: '7 Oct 2019 11:53:00', peer: 25, lastSeenUser: 'Glenn_Roberto' },
    ];

    hostDatas: any;
    provideData() {
        if (this.selectedHost == 'AWS-S3-Instance01')
            this.hostDatas = AWS_S3_Instance01_data;
        if (this.selectedHost == 'DESK-10982')
            this.hostDatas = DESK_10982_data;
        if (this.selectedHost == 'DESK-1456')
            this.hostDatas = DESK_1456_data;
        if (this.selectedHost == 'DESK-1576')
            this.hostDatas = DESK_1576_data;
        if (this.selectedHost == 'WK-1929304D')
            this.hostDatas = WK_1929304D_data;
    }

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router, private performRemediationService: PerformRemediationService) {
    }

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedHost = params.get('selectedHost');
        });

        this.getDataByHost();
        this.provideData();
    }

    getDataByHost() {
        this.hostAddressData.forEach(hostData => {
            if (hostData.value === this.selectedHost)
                this.hostDetails = hostData;
        });
    }

    routeToPerformRemediation(performRemediationTitle: string) {
        this.performRemediationService.performRemediationTitle = performRemediationTitle;
        this.router.navigate(['/performRemediation'])
    }

    initializeLineChart() {

        am4core.useTheme(am4themes_animated);
        // Themes end

        let chart = am4core.create("lineChartDiv", am4charts.XYChart);
        chart.paddingRight = 20;

        let data = [];
        let visits = 10;
        let previousValue;

        for (var i = 0; i < 100; i++) {
            visits = Math.round(i * Math.random());

            if (visits > 100) {
                visits = 80 + i;
            }

            if (i > 0) {
                // add color to previous data item depending on whether current value is less or more than previous value
                if (previousValue <= 65)
                    data[i - 1].color = am4core.color('#ADFF2F');
                else if (previousValue > 65 && previousValue <= 79)
                    data[i - 1].color = am4core.color('#FFA500');
                else
                    data[i - 1].color = am4core.color('#f00');

            }

            data.push({ date: new Date(2018, 0, i + 1), value: visits });
            previousValue = visits;
        }

        chart.data = data;

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
        series.dataFields.valueY = "value";
        series.strokeWidth = 2;
        series.tooltipText = "value: {valueY}, date: {dateX}";

        // set stroke property field
        series.propertyFields.stroke = "color";

        chart.cursor = new am4charts.XYCursor();

        let scrollbarX = new am4core.Scrollbar();
        chart.scrollbarX = scrollbarX;

    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.initializeLineChart();
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
        window.open("#/policyViolationSummary", '_blank');
    }

}
