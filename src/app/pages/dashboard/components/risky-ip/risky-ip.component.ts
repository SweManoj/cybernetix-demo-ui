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

@Component({
    selector: 'app-risky-ip',
    templateUrl: './risky-ip.component.html',
    styleUrls: ['./risky-ip.component.scss']
})
export class RiskyIPComponent implements OnInit {

    selectedIP: string;
    ipDetails: any;

    ipaddressesData = [
        { value: '10.82.32.212', score: 45, location: 'London, UK', lastSeen: '27 Jun 2019 03:22:00', peer: 2, lastSeenUser: 'LONDESK588' },
        { value: '82.102.21.217', score: 60, location: 'Beijing, China', lastSeen: '21 Jun 2019 17:10:00', peer: 3, lastSeenUser: 'NEI89321' },
        { value: '95.181.116.77', score: 85, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { value: '23.94.213.6', score: 89, location: 'Berlin, Germany', lastSeen: '23 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { value: '69.249.19.217', score: 76, location: 'Paris, France ', lastSeen: '24 Jun 2019 18:38:00', peer: 3, lastSeenUser: 'JRU87122' }];

    hardCodeItemData = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV 083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
            }
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV 061',
            riskScore: 483,
            ruleInfo: {
                ruleId: 2,
                title: 'Successful Logon from Rare Machine - Windows'
            }
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 451,
            ruleInfo: {
                ruleId: 3,
                title: 'Unusual Data Exfiltration By Service Account - Proxy'
            }
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV 041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            }
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '14:45:00',
            accord: false,
            pv: 'PV 069',
            riskScore: 243,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Process Executed - Windows'
            }
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '17:14:00',
            accord: false,
            pv: 'PV 094',
            riskScore: 149,
            ruleInfo: {
                ruleId: 6,
                title: 'Multiple Users Logged-In Successfully From Same IP'
            }
        }
    ];


    hardCodeItemForDemo = [
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV 083',
            riskScore: 87,
            ruleInfo: {
                ruleId: 1,
                title: "Inbound Telnet Traffic From Blacklisted IP's"
            }
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV 061',
            riskScore: 11,
            ruleInfo: {
                ruleId: 2,
                title: "Inbound Uncategorized Traffic From Multiple URL's"
            }
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 4,
            ruleInfo: {
                ruleId: 3,
                title: 'Outbound P2P File Sharing Traffic to Rare Host'
            }
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV 041',
            riskScore: 36,
            ruleInfo: {
                ruleId: 4,
                title: 'Outbound Malicious Traffic from Multiple Ports'
            }
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '14:45:00',
            accord: false,
            pv: 'PV 069',
            riskScore: 82,
            ruleInfo: {
                ruleId: 5,
                title: 'Excessive Bytes Sent to Suspicious External Host via FTP'
            }
        }
    ];

    threatCategories = [
        {
            title: 'Kill Chain',
            value: 'Actions/Maintain'
        },
        {
            title: 'Threat Category',
            value: 'Access Authentication'
        },
        {
            title: 'Sub Category',
            value: 'Bruce Force Attack'
        }
    ]

    dummyDatas = [
        {
            title: 'Affected Entity',
            value: ''
        },
        {
            title: 'Locations',
            value: ''
        },
        {
            title: 'Status',
            value: ''
        },
        {
            title: 'Resources',
            value: ''
        },
        {
            title: 'Indicators',
            value: ''
        },
        /* {
            title: 'Priority',
            value: 'Be sure to add aria-expanded to the control element. This attribute explicitly conveys the current state of the collapsible'
        } */
    ];


    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router) {
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

    ngOnInit() {

        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIP = params.get('selectedIP');
            if(this.selectedIP === '10.82.32.212'){
                this.hardCodeItemData = this.hardCodeItemForDemo;
            }
        });

        this.getDataByIP();

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

            data.push({ date: new Date(2018, 0, i + 1), value: visits });
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

    gotoSummery(){
        window.open("#/policyViolationSummary", '_blank');
    }

}
