import { Component, NgZone, OnInit, AfterContentInit } from '@angular/core';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskyUserService } from '../riskyUsers/riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskScoreModalComponent } from '../riskyUsers/risk-score-modal/risk-score-modal.component';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from '@amcharts/amcharts4/charts';

@Component({
    selector: 'app-riskyHost',
    templateUrl: './riskyHost.component.html',
    styleUrls: ['./riskyHost.component.scss']
})
export class RiskyHostComponent implements OnInit {

    selectedHost: string;
    hostDetails: any;

    hostAddressData = [
        // { type: 'host', value: 'PUNDESK001', score: 30, img: false, location: 'Munich, Germany', lastSeen: '23 Jun 2019 03:22:00', peer: 2, lastSeenUser: 'PAV58329' },
        { type: 'host', value: 'WK-1929304D', score: 93, img: false, location: 'San Diego', lastSeen: '14 Oct 2019 03:22:00', peer: 212, lastSeenUser: 'Chen_Zhang' },
        { type: 'host', value: 'USADESK25', score: 89, img: false, location: 'Amsterdam, Netherlands ', lastSeen: '21 Jun 2019 17:10:00', peer: 3, lastSeenUser: 'NEI89321' },
        { type: 'host', value: 'CHNLAP963', score: 66, img: false, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { type: 'host', value: 'LONDESK588', score: 95, img: false, location: 'Beijing, China', lastSeen: '27 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { type: 'host', value: 'AUSLAP4873', score: 90, img: false, location: 'Sydney, Australia', lastSeen: '14 Aug 2019 17:23:12', peer: 23, lastSeenUser: 'AndrewsStarc1' }];

    hardCodeItemData = [
        {
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
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV 041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            }
        },

    ];

    hardCodeItemDataForAUS = [
        {
            generatedDateFormat: '13 July 2019',
            generatedTimestamp: '10:45:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 36,
            ruleInfo: {
                ruleId: 6,
                title: 'Threat Intelligence - Communication with Blacklisted IP'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: ' Malicious Outbound Communication' },
            { title: 'Threat Category', value: ' Malicious Outbound Communication' },
            { title: 'Sub Category', value: ' Malicious Outbound Communication' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AUSLAP4873' },
            { title: 'Locations', value: 'Taipie' },
            { title: 'Status', value: 'Risk: 90' },
            { title: 'Resources', value: 'Firewall' },
            { title: 'Indicators', value: 'DestIP, DestPort' }],
            description: 'This violation is flagged when there are high number of outbound connections to Blacklisted hosts as per Threat Intelligence feed'
        },
        {
            generatedDateFormat: '13 July 2019',
            generatedTimestamp: '10:02:00',
            accord: false,
            pv: 'PV_013',
            riskScore: 45,
            ruleInfo: {
                ruleId: 6,
                title: 'Rare Outbound Connections - Firewall'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Malicious Outbound Communication' },
            { title: 'Threat Category', value: ' Malicious Outbound Communication' },
            { title: 'Sub Category', value: 'Malicious Outbound Communication' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AUSLAP4873' },
            { title: 'Locations', value: 'Taipie' },
            { title: 'Status', value: 'Risk: 82' },
            { title: 'Resources', value: 'Firewall' },
            { title: 'Indicators', value: 'DestIP, DestPort' }],
            description: 'This violation is flagged when there are high number of outbound connections to Rare hosts'
        },
        {
            generatedDateFormat: '13 July 2019',
            generatedTimestamp: '09:42:00',
            accord: false,
            pv: 'PV_012',
            riskScore: 94,
            ruleInfo: {
                ruleId: 6,
                title: 'Spam/Spyware URL Accessed - Proxy'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Suspicious/Malicious Behavior' },
            { title: 'Threat Category', value: 'Suspicious/Malicious Behavior' },
            { title: 'Sub Category', value: 'Spam/Spyware' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AUSLAP4873' },
            { title: 'Locations', value: 'Sydney' },
            { title: 'Status', value: 'Risk: 71' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'URL' }],
            description: 'This violation is flagged when there are high number of Spam/Spyware URL’s accessed'
        },

        {
            generatedDateFormat: '13 July 2019',
            generatedTimestamp: '07:13:00',
            accord: false,
            pv: 'PV_011',
            riskScore: 23,
            ruleInfo: {
                ruleId: 6,
                title: 'Abnormal Vulnerability Detected - Qualys'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Suspicious/Malicious Behavior' },
            { title: 'Threat Category', value: 'Suspicious/Malicious Behavior' },
            { title: 'Sub Category', value: 'Vulnerabilities' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AUSLAP4873' },
            { title: 'Locations', value: 'Sydney' },
            { title: 'Status', value: 'Risk: 53' },
            { title: 'Resources', value: 'Qualys' },
            { title: 'Indicators', value: 'Filenames' }],
            description: 'This violation is flagged when there are abnormal vulnerabilities found in the host as per baselining.'
        }
    ]

    hardCodeItemForDemo = [
        {
            generatedDateFormat: 'June 27 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'TI 083',
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
            riskScore: 64,
            ruleInfo: {
                ruleId: 2,
                title: "Inbound Spam Traffic From OFAC Countries"
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

    chen_ZhangHardCodeItemDate = [
        {
            generatedDateFormat: '27 Sep 2019',
            generatedTimestamp: '10:13:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 9,
            ruleInfo: {
                ruleId: 1,
                title: 'Excessive Bytes Exfiltrated via HTTPS'
            },
            incId: 'INC-1',
            description: 'This violation is flagged when Excessive Bytes Exfiltrated via HTTPS',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Database Upload' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'Chen_Zhang, WK-1929304D' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Status', value: 'Risk: 93' },
                { title: 'Resource', value: 'Proxy' },
                { title: 'Indicators', value: 'Event, Accountname, SrcHost, BytesOut' }
            ]
        },
        {
            generatedDateFormat: '27 Sep 2019',
            generatedTimestamp: '09:43:00',
            accord: false,
            pv: 'PV_056',
            riskScore: 9,
            ruleInfo: {
                ruleId: 1,
                title: 'Guardium: Database Dump Activity on Rare Subnet'
            },
            incId: 'INC-1',
            description: 'This violation is flagged when Database Dump Activity is performed on Rare Subnet',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Database Dumb' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'adm_RL93, WK-1929304D' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Status', value: 'Risk: 91' },
                { title: 'Resource', value: 'Guardium' },
                { title: 'Indicators', value: 'Event, Accountname, SrcHost' }
            ]
        },
        {
            generatedDateFormat: '27 Sep 2019',
            generatedTimestamp: '09:13:00',
            accord: false,
            pv: 'PV_017',
            riskScore: 29,
            ruleInfo: {
                ruleId: 1,
                title: ' Privileged Activity By Dormant Account'
            },
            incId: 'INC-1',
            description: 'This violation is flagged when Privileged Activity is performed after more than 45 days',
            threatCategories: [
                { title: 'Kill Chain', value: 'Suspicious/Malicious Behavior' },
                { title: 'Threat Category', value: 'Dormant Activity' },
                { title: 'Sub Category', value: 'Dormant Activity' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'adm_RL93, WK-1929304D' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Status', value: 'Risk: 87' },
                { title: 'Resource', value: 'Guardium' },
                { title: 'Indicators', value: 'Event, Accountname, SrcHost' }
            ]
        },
        {
            generatedDateFormat: '27 Sep 2019',
            generatedTimestamp: '07:45:00',
            accord: false,
            pv: 'PV_069',
            riskScore: 29,
            ruleInfo: {
                ruleId: 7,
                title: 'Multiple Users Presence on Same IP'
            },
            incId: 'INC-1',
            description: 'This violation is flagged when multiple users presence seen on Same IP',
            threatCategories: [
                { title: 'Kill Chain', value: 'Account Compromise' },
                { title: 'Threat Category', value: 'Account Compromise' },
                { title: 'Sub Category', value: 'Account Compromise' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'Steve_Warner, Ross_Liam,adm_RL93, WK-1929304D' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Status', value: 'Risk: 81' },
                { title: 'Resource', value: 'Guardium' },
                { title: 'Indicators', value: 'Event, Accountname, SrcHost' }
            ]
        },
        {
            generatedDateFormat: '27 Sep 2019',
            generatedTimestamp: '07:01:00',
            accord: false,
            pv: 'PV_071',
            riskScore: 32,
            ruleInfo: {
                ruleId: 7,
                title: 'Guardium - Database Events By Restricted Users'
            },
            incId: 'INC-1',
            description: 'This violation is flagged when there are unusual number of attempts by Restricted User',
            threatCategories: [
                { title: 'Kill Chain', value: 'Suspicious/Malicious Behavior' },
                { title: 'Threat Category', value: 'Privileged Activity Attempt' },
                { title: 'Sub Category', value: 'Privileged Activity Attempt' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'Chen_Zhang, WK-1929304D' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Status', value: 'Risk: 63' },
                { title: 'Resource', value: 'Guardium' },
                { title: 'Indicators', value: 'Event, Accountname' }
            ]
        },
    ];

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router) {
    }

    getDataByHost() {
        this.hostAddressData.forEach(hostData => {
            if (hostData.value === this.selectedHost)
                this.hostDetails = hostData;
        });

        /* this.hostAddressData.forEach(hostData => {
            if (hostData.value === 'WK-1929304D')
                this.hostDetails = this.chen_ZhangHardCodeItemDate;
            else if (hostData.value === this.selectedHost)
                this.hostDetails = hostData;
        }); */
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

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedHost = params.get('selectedHost');
            /* if (this.selectedHost == 'WK-1929304D')
                this.hardCodeItemData = this.chen_ZhangHardCodeItemDate; */
        });

        this.getDataByHost();
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
