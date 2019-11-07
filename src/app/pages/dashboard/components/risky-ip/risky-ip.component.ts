import { Component, NgZone, OnInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskyUserService } from '../riskyUsers/riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from '@amcharts/amcharts4/charts';
import { bubbleDataMonth } from '../riskyUsers/data';
import { RiskScoreModalComponent } from '../riskyUsers/risk-score-modal/risk-score-modal.component';
import { ip_10_82_69_151_data, ip_18_10_8_1_data, ip_10_82_34_107_data, ip_10_82_71_192_data, ip_10_82_32_212_data } from './data';

@Component({
    selector: 'app-risky-ip',
    templateUrl: './risky-ip.component.html',
    styleUrls: ['./risky-ip.component.scss']
})
export class RiskyIPComponent implements OnInit {

    selectedIP: string;
    ipDetails: any;

    ipaddressesData = [
        { value: '10.82.71.192', score: 96, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '10.82.32.212', score: 95, location: 'London, UK', lastSeen: '27 Jun 2019 03:22:00', peer: 32, lastSeenUser: 'ChrisM98' }, // Special Design
        { value: '10.82.69.151', score: 94, location: 'New Jersey', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '18.10.8.1', score: 93, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '10.82.34.107', score: 93, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },

        // unused IPs
        { value: '82.102.21.217', score: 60, location: 'Beijing, China', lastSeen: '21 Jun 2019 17:10:00', peer: 2, lastSeenUser: 'NEI89321' },
        { value: '95.181.116.77', score: 85, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { value: '23.94.213.6', score: 89, location: 'Berlin, Germany', lastSeen: '23 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { value: '69.249.19.217', score: 76, location: 'Paris, France', lastSeen: '24 Jun 2019 18:38:00', peer: 3, lastSeenUser: 'JRU87122' },
        { value: '172.168.200.55', score: 93, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '10.82.34.101', score: 93, location: '-', lastSeen: '-', peer: '-', lastSeenUser: '-' },
    ];

    hostViolations: any;
    provideDataForIP() {
        if (this.selectedIP === '10.82.71.192')
            this.hostViolations = ip_10_82_71_192_data;
        if (this.selectedIP === '10.82.32.212')  // 2nd IP - 10.82.32.212 Special Design
            this.hostViolations = ip_10_82_32_212_data;
        else if (this.selectedIP === '10.82.69.151')
            this.hostViolations = ip_10_82_69_151_data;
        else if (this.selectedIP === '18.10.8.1')
            this.hostViolations = ip_18_10_8_1_data;
        else if (this.selectedIP === '10.82.34.107')
            this.hostViolations = ip_10_82_34_107_data;
    }

    infoStyleObject(input): Object {
        if (input == 'INFO')
            return { 'color': 'yellow', 'margin-right': '2rem' }

        return { 'color': 'red' }
    }

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router) {
    }

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIP = params.get('selectedIP');
            this.provideDataForIP();
        });

        this.getDataByIP();
    }

    getDataByIP() {
        this.ipaddressesData.forEach(ipData => {
            if (ipData.value === this.selectedIP) {
                this.ipDetails = ipData;
            }
        });
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            // Initialize Bubble chart
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

            data.push({ date: new Date(2019, 5, i + 1), value: visits });
            previousValue = visits;
        }

        chart.data = data;

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
        series.dataFields.valueY = "value";
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
        window.open("#/policyViolationSummary", '_blank');
    }

}
