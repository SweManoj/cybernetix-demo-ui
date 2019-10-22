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
        { value: '10.82.32.212', score: 95, location: 'London, UK', lastSeen: '27 Jun 2019 03:22:00', peer: 32, lastSeenUser: 'ChrisM98' },
        { value: '18.10.8.1', score: 93, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '82.102.21.217', score: 60, location: 'Beijing, China', lastSeen: '21 Jun 2019 17:10:00', peer: 2, lastSeenUser: 'NEI89321' },
        { value: '95.181.116.77', score: 85, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { value: '23.94.213.6', score: 89, location: 'Berlin, Germany', lastSeen: '23 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { value: '69.249.19.217', score: 76, location: 'Paris, France', lastSeen: '24 Jun 2019 18:38:00', peer: 3, lastSeenUser: 'JRU87122' },

        { value: '172.168.200.55', score: 93, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { value: '10.82.34.101', score: 93, location: '-', lastSeen: '-', peer: '-', lastSeenUser: '-' }
    ];

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
            generatedTimestamp: '12:45:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 4,
            ruleInfo: {
                ruleId: 3,
                title: 'Outbound P2P File Sharing Traffic to Rare Host'
            },
            threatCategories: [{ title: 'Kill Chain', value: 'C2' },
            { title: 'Threat Category', value: 'Malicious Behavior' },
            { title: 'Sub Category', value: 'P2P Traffic' }],
            dummyDatas: [{ title: 'Affected Entity', value: '10.82.32.227' },
            { title: 'Locations', value: 'Indonesia' },
            { title: 'Risk', value: '95' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'DstIP, URL, Category, BytesOut' }],
            description: 'This Violation is triggered when there is suspicious Outbound traffic with P2P Category to Rare URL'
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '06:43:00',
            accord: false,
            pv: 'INFO',
            riskScore: 2,
            ruleInfo: {
                ruleId: 3,
                title: 'DHCP RENEWAL'
            },
            threatCategories: [{ title: 'Kill Chain', value: '' },
            { title: 'Threat Category', value: '' },
            { title: 'Sub Category', value: '' }],
            dummyDatas: [{ title: 'New Hostname', value: 'WK-UKL48503D' },
            { title: 'New IP', value: '10.82.32.227' },
            /* { title: 'Locations', value: '' },
            { title: 'Status', value: '' },
            { title: 'Resources', value: 'DHCP' },
            { title: 'Indicators', value: 'AgentIP, AgentMAC, AgentHostname' } */],
            description: 'This event correlates Dynamic IP with Hostnames / MAC'
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV 067',
            riskScore: 13,
            ruleInfo: {
                ruleId: 3,
                title: 'Inbound Traffic on SMB Port from Suspicious Location'
            },
            threatCategories: [{ title: 'Kill Chain', value: 'Reconnaissance' },
            { title: 'Threat Category', value: 'Malicious Behavior' },
            { title: 'Sub Category', value: 'Inbound SMB' }],
            dummyDatas: [{ title: 'Affected Entity', value: '10.82.32.212' },
            { title: 'Locations', value: 'Indonesia' },
            { title: 'Risk', value: '74' },
            { title: 'Resources', value: 'Netflow' },
            { title: 'Indicators', value: 'SrcIP, DstIP, DstPort' }],
            description: 'This Violation is triggered when there is Inbound SMB traffic from Rare Location'
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 6,
            ruleInfo: {
                ruleId: 1,
                title: "Inbound Telnet Traffic From Blacklisted IP's"
            },
            threatCategories: [{ title: 'Kill Chain', value: 'Reconnaissance' },
            { title: 'Threat Category', value: 'Malicious Behavior' },
            { title: 'Sub Category', value: 'Inbound Telnet' }],
            dummyDatas: [{ title: 'Affected Entity', value: '10.82.32.212' },
            { title: 'Locations', value: 'Indonesia' },
            { title: 'Risk', value: '63' },
            { title: 'Resources', value: 'Netflow' },
            { title: 'Indicators', value: 'SrcIP, DstIP, DstPort, Threat Intelligence' }],
            description: 'This Violation is triggered when there is Inbound Telnet traffic from Blacklisted IP'
        },
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '01:17:00',
            accord: false,
            pv: 'PV 022',
            riskScore: 34,
            ruleInfo: {
                ruleId: 1,
                title: "Port Scanning from External IP"
            },
            threatCategories: [{ title: 'Kill Chain', value: 'Reconnaissance' },
            { title: 'Threat Category', value: 'Port Scanning' },
            { title: 'Sub Category', value: 'Inbound Attack' }],
            dummyDatas: [{ title: 'Affected Entity', value: '10.82.32.212' },
            { title: 'Locations', value: 'Indonesia' },
            { title: 'Risk', value: '54' },
            { title: 'Resources', value: 'Netflow' },
            { title: 'Indicators', value: 'SrcIP, DstIP, DstPort' }],
            description: 'This Violation is triggered when Port Scanning operation is detected from External IP'
        }
    ];

    hardCodeItemFor172IP = [
        {
            generatedDateFormat: 'Oct 1 2019',
            generatedTimestamp: '08:50:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 35,
            ruleInfo: {
                ruleId: 3,
                title: 'Network scanning activities identified from vendor/partner network subnet'
            },
            threatCategories: [
                { title: 'Kill Chain', value: 'Recon' },
                { title: 'Threat Category', value: 'Internal Network Scan' },
                { title: 'Sub Category', value: 'Internal Network Scan' }],
            dummyDatas: [
                { title: 'Affected Entity', value: '172.168.200.55, 10.82.34.101, 10.82.34.102, 10.82.34.104, 10.82.34.111, 192.168.200.55, 192.168.200.57, 10.67.122.136, 10.67.122.132' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resources', value: 'Windows, NetFlow' },
                { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
            description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP Kill Chain: Reconnaissance'
        }
    ];

    hardCodeItemFor18IP = [
        {
            generatedDateFormat: 'Sep 27 2019',
            generatedTimestamp: '10:13:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 35,
            ruleInfo: {
                ruleId: 3,
                title: 'Potential scanning attempt on public facing cloud instance'
            },
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Reconnaissance' },
                { title: 'Sub Category', value: 'Reconnaissance' }],
            dummyDatas: [
                { title: 'Affected Entity', value: '18.10.8.1' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '65' },
                { title: 'Resources', value: 'Firewall' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action' },
                { title: 'IOC Reputation', value: 'TOR IP / Malicious IP' }],
            description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP Kill Chain: Reconnaissance'
        },
        {
            generatedDateFormat: 'Sep 27 2019',
            generatedTimestamp: '10:30:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 127,
            ruleInfo: {
                ruleId: 3,
                title: 'High number of Denied traffic followed by Allowed traffic'
            },
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Potential Firewall Compromise' },
                { title: 'Sub Category', value: 'Potential Firewall Compromise' }],
            dummyDatas: [
                { title: 'Affected Entity', value: '18.10.8.1' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '81' },
                { title: 'Resources', value: 'Firewall' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action, Destination Port' },
                { title: 'IOC Reputation', value: 'TOR IP / Malicious IP' }],
            description: 'This Policy is triggered when high number of Denied Traffic observed in firewall followed by Allowed Traffic from a same Source IP'
        },
        {
            generatedDateFormat: 'Sep 27 2019',
            generatedTimestamp: '10:30:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 127,
            ruleInfo: {
                ruleId: 3,
                title: 'Inbound Allowed traffic on Non-standard ports'
            },
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Initial Access' },
                { title: 'Sub Category', value: 'Compromise' }],
            dummyDatas: [
                { title: 'Affected Entity', value: '18.10.8.1' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '93' },
                { title: 'Resources', value: 'Firewall' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action, DestinationPort' },
                { title: 'IOC Reputation', value: 'TOR IP / Malicious IP' }],
            description: 'This Policy is triggered when traffic observed towards a nonstandard port'
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

    itemInfo = [{
        title: 'Last Hostname:',
        value: 'WK-UKL48503D'
    }, {
        title: 'Last IP:',
        value: '10.82.32.212'
    }]

    infoStyleObject(input): Object {
        if (input == 'INFO') {
            return { 'color': 'yellow', 'margin-right': '2rem' }
        }
        return { 'color': 'red' }
    }

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
