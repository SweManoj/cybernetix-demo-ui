import { Component, NgZone } from '@angular/core';
import { RiskyUserService } from './riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskyUserInfoModalComponent } from './risky-user-info-modal/risky-user-info-modal.component';
import { bubbleDataMonth, chenZhangActivities, glenRobertoActivities, scottEdwinActivities, normalUserActivities, aWendlerData, chenZhangData, glenRobertData, scottEdwinData, normalUserData } from './data';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskScoreModalComponent } from './risk-score-modal/risk-score-modal.component';
import { TopDetailsService } from '../topDetails/topDetails.service';
import { PerformRemediationService } from '../../../../core/services/perform-remediation.service';

@Component({
    selector: 'risky-users',
    templateUrl: './riskyUsers.component.html'
})
export class RiskyUsersComponent {

    allUsers: any = [];
    selectedDateRange: string;
    totalRecords: number = 0;
    recordsReturned: number = 0;
    selectedUserDetails: any = {};
    selectedView = 'timeline';
    private offset: number = 0;
    selectedUserInfo: any[];

    hardCodeItemDataForDemoForEmoor: any[];
    hardCodeItemDataForDemoForMendelson = [];
    userData: any;
    riskyUserObjects = [
        {
            type: 'user',
            value: 'AWendler',
            score: 97,
            img: true,
            role: 'Product Specialist',
            department: 'Product Development',
            location: 'Berlin',
            reportingManager: 'Peter Moore',
            creationDate: '13 Jun 2018',
            lastWorkDay: '9 Jul 2019'
        },
        {
            type: 'user',
            value: 'Adm-EMoor',
            score: 95,
            img: true,
            role: 'AVP - Sales',
            department: 'Sales',
            location: 'San Diego',
            reportingManager: 'Ryan Smith',
            creationDate: '12 Jan 2016',
            lastWorkDay: '4 Oct 2019'
        },
        {
            type: 'user',
            value: 'Glenn_Roberto',
            score: 93,
            img: true,
            role: 'Sr Technical Consultant',
            department: 'IT Systems',
            location: 'San Diego',
            reportingManager: 'Paul Smith',
            creationDate: '13 Oct 2018',
            lastWorkDay: '-'
        },
        {
            type: 'user',
            value: 'Chen_Zhang',
            score: 93,
            img: true,
            role: 'Sr. Software Engineer',
            department: ' IT Security',
            location: 'San Diego',
            reportingManager: 'John Smith',
            creationDate: '13th Oct 2018',
            lastWorkDay: '-'
        },
        {
            type: 'user',
            value: 'Scott_Edwin',
            score: 92,
            img: true,
            role: 'Vendor',
            department: 'Infrastructure Monitoring',
            location: 'Minneapolis',
            reportingManager: 'John_Smith',
            creationDate: '13 Jan 2018',
            lastWorkDay: '-'
        },
        // =========== NOT USED =================
        {
            type: 'user',
            value: 'ADittmer',
            score: 94,
            img: true,
            role: 'Sr. Tester',
            department: 'Quality Testing',
            location: 'Los Angles',
            reportingManager: 'Paul Smith',
            creationDate: '12 Dec 2018',
            lastWorkDay: '25 Jan 2019'
        },
        {
            type: 'user',
            value: 'Svc-ROpitz',
            score: 54,
            img: true,
            role: 'Project Manager',
            department: 'Production',
            location: 'Paris',
            reportingManager: 'Alex Gee',
            creationDate: '23 Aug 2018',
            lastWorkDay: '24 May 2019'
        },
        {
            type: 'user',
            value: 'Alysa',
            score: 82,
            img: true,
            role: 'Project Manager',
            department: 'Production',
            location: 'Stuttgart',
            reportingManager: 'Rolf Dobelli',
            creationDate: '21 Nov 2017',
            lastWorkDay: '24 Apr 2019'
        },
        {
            type: 'user',
            value: 'Maile',
            score: 87,
            img: true,
            role: 'AVP - Sales',
            department: 'Sales',
            location: 'San Diego',
            reportingManager: 'Ryan Smith',
            creationDate: '12 Jan 2016',
            lastWorkDay: '24 Apr 2019'
        },
        {
            type: 'user',
            value: 'JohnS',
            score: 88,
            img: true,
            role: 'Contrator',
            department: 'Contractor',
            location: 'Seattle',
            reportingManager: 'George Bailey',
            creationDate: '12 Jan 2016',
            lastWorkDay: '24 Apr 2019'
        },
        {
            type: 'user',
            value: 'Mendelson',
            score: 87,
            img: true,
            role: 'Software Developer',
            department: 'ITSec',
            location: 'New Jersey',
            reportingManager: 'George Bailey',
            creationDate: '12 Jan 2016',
            lastWorkDay: '-'
        },
        {
            type: 'user',
            value: 'Heidy',
            score: 88,
            img: true,
            role: 'VP - Sales',
            department: 'Sales',
            location: 'Los Angeles',
            reportingManager: 'Brett Root',
            creationDate: '19th Sep 2018',
            lastWorkDay: '-'
        }
    ];

    constructor(private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router, private topDetailsService: TopDetailsService, private performRemediationService: PerformRemediationService) {
        window.scrollTo(0, 0);
        this.offset = 0;
        this.recordsReturned = 0;
        this.selectedDateRange = '1 Week';
    }

    riskyUserActivities: any;
    selectedRiskyUser: String;

    setRiskyUserActivity() {
        if (this.selectedRiskyUser == 'Chen_Zhang')
            this.riskyUserActivities = chenZhangActivities;
        else if (this.selectedRiskyUser == 'Glenn_Roberto')
            this.riskyUserActivities = glenRobertoActivities;
        else if (this.selectedRiskyUser == 'Scott_Edwin')
            this.riskyUserActivities = scottEdwinActivities;
        else
            this.riskyUserActivities = normalUserActivities;
    }

    riskyUserViolations: any;
    selectRiskyUserViolation() {
        if (this.selectedRiskyUser == 'AWendler')
            this.riskyUserViolations = aWendlerData;
        else if (this.selectedRiskyUser == 'Chen_Zhang')
            this.riskyUserViolations = chenZhangData;
        else if (this.selectedRiskyUser == 'Glenn_Roberto')
            this.riskyUserViolations = glenRobertData;
        else if (this.selectedRiskyUser == 'Scott_Edwin')
            this.riskyUserViolations = scottEdwinData;
        else
            this.riskyUserViolations = normalUserData;
    }

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedRiskyUser = params.get('selectedUser');
            this.setRiskyUserActivity();

            this.selectedUserInfo = this.riskyUserObjects.filter(riskyObj => riskyObj.type == 'user');
            this.selectedUserInfo.forEach(res => {
                if (res.value == this.selectedRiskyUser)
                    this.userData = res;
            });

            this.selectRiskyUserViolation();

            /* if (this.selectedUser) {
                const dotIndex = this.selectedUser.indexOf('.');
                const isResource = dotIndex !== -1;
                const selectedUserData = this.riskyUserService.getSelectedUserData(this.selectedUser, isResource);
                const selectedUserDataFromModel = this.riskyUserService.getSelectedUserDataFromModel(this.selectedUser, isResource);
                forkJoin([selectedUserData, selectedUserDataFromModel]).subscribe((results: any) => {
                    const userData = results[0],
                        userDataFromModel = results[1];
                    this.selectedUserDetails.userInfo = userData.userInfo && userData.userInfo[0] || {};
                    this.selectedUserDetails.totalScore = userData.totalScore && userData.totalScore.total_riskscore || 0;
                });
            } else {
                this.getAllUsers();
            } */
        });
    }

    incidentDetail: any;
    incidentDetails = [
        {
            incident: 'TVDE38',
            affectedEntity: 'Adm-EMoor, SVL-EMoor, WK-38482L, 10.82.30.121',
            lastUpdatedOn: '23 Sep 2019 09:33',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Closed',
            outcome: 'True Positive',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '136', title: 'Events' },
                { image: 'resources@1x.png', value: '04', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '05', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE21',
            affectedEntity: '10.82.32.212, WK-UKL48503D, 10.82.32.227, 00:0a:95:9d:68:16',
            lastUpdatedOn: '27 June 2019 12:45',
            lastUpdatedBy: 'Scott R',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '59', title: 'Events' },
                { image: 'resources@1x.png', value: '03', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '04', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE43',
            affectedEntity: 'Chen_Zhang, Steve_Warner, Ross_Liam, adm_RL93, WK-1929304D',
            lastUpdatedOn: '13 Oct 2019 10:13',
            lastUpdatedBy: 'Steve D',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '108', title: 'Events' },
                { image: 'resources@1x.png', value: '02', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '05', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVAC92',
            affectedEntity: 'AWendler',
            lastUpdatedOn: '13 June 2019 06:22',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Closed',
            outcome: 'True Positive',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '351', title: 'Events' },
                { image: 'resources@1x.png', value: '06', title: 'Resources' },
                { image: 'Shape@1x.png', value: '02', title: 'Locations' },
                { image: 'violations@1x.png', value: '09', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVRC4',
            affectedEntity: 'AWS-S3-Instance01,Glenn_Roberto,AWS-DomainEC2-Instance07,18.10.8.1',
            lastUpdatedOn: '4 Oct 2019 03:50',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '482', title: 'Events' },
                { image: 'resources@1x.png', value: '04', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '12', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE23',
            affectedEntity: 'Scott_Edwin,10.82.71.192, 10.82.34.107, 10.82.69.151',
            lastUpdatedOn: '14 Oct 2019 03:50',
            lastUpdatedBy: 'Scott R',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '982', title: 'Events' },
                { image: 'resources@1x.png', value: '05', title: 'Resources' },
                { image: 'Shape@1x.png', value: '02', title: 'Locations' },
                { image: 'violations@1x.png', value: '10', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        }
    ];

    outcomeStyle(outcome: string) {
        if (outcome.includes('True Positive'))
            return { 'color': 'white', 'background-color': 'red' }
        else if (outcome.includes('Investigation In Progress'))
            return { 'color': 'white', 'background-color': 'orange' }
        else
            return { 'color': 'white' };
    }

    incidentViolations: any;

    admEmoorHardCodeItemData: any = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:33:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 27,
            ruleInfo: {
                ruleId: 1,
                title: 'Data Exfiltration via HTTPS'
            },
            incId: 'INC-1',
            description: 'This Violation is triggered when user exfiltrates excissive bytes of data via HTTPS',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration via HTTPS' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'SVL-EMoor, WK-38482L' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '95' },
                { title: 'Resource', value: 'Proxy' },
                { title: 'Indicators', value: 'URL, BytesOut, Event' }
            ]
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:17:00',
            accord: false,
            pv: 'PV_061',
            riskScore: 6,
            ruleInfo: {
                ruleId: 2,
                title: 'Rare Access to Proxy By Service Account'
            },
            incId: 'INC-2',
            description: 'This Violation is triggered when service attempts to connect to Proxy',
            threatCategories: [
                { title: 'Kill Chain', value: 'Exploitation' },
                { title: 'Threat Category', value: 'Proxy Attempts' },
                { title: 'Sub Category', value: 'Proxy Attempts' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'SVL-EMoor, WK-38482L' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '89' },
                { title: 'Resource', value: 'Proxy' },
                { title: 'Indicators', value: 'URL' }
            ]
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:13:00',
            accord: false,
            pv: 'PV_039',
            riskScore: 13,
            ruleInfo: {
                ruleId: 3,
                title: 'Data Exfiltration Attempts via Email: DLP Alert '
            },
            incId: 'INC-3',
            description: 'This Violation is triggered when User attempts to exfiltrate data via DLP',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration Attempt' },
                { title: 'Sub Category', value: 'Data Exfiltration Attempt via Email' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'SVL-EMoor, WK-38482L' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '86' },
                { title: 'Resource', value: 'DLP Network' },
                { title: 'Indicators', value: 'FileNames, BytesOut, Event' }
            ]
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '08:34:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 63,
            ruleInfo: {
                ruleId: 4,
                title: 'Abnormal Downloads from 0365 Sharepoint'
            },
            incId: 'INC-4',
            description: 'This Violation is triggered when User downloads high number of Files / documents from 0-365 Sharepoint',
            threatCategories: [
                { title: 'Kill Chain', value: 'Insider Threat' },
                { title: 'Threat Category', value: 'Data Downloads' },
                { title: 'Sub Category', value: 'Data Downloads from Cloud' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'SVL-EMoor, WK-38482L' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '83' },
                { title: 'Resource', value: '0365 Sharepoint' },
                { title: 'Indicators', value: 'FileNames, Size, Event' }
            ]
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '07:42:00',
            accord: false,
            pv: 'PV_069',
            riskScore: 27,
            ruleInfo: {
                ruleId: 5,
                title: 'Privileged Escalation to Service Account'
            },
            incId: 'INC-5',
            description: 'This Violation is triggered when User grants groups / permissions to Service Account',
            threatCategories: [
                { title: 'Kill Chain', value: 'Privilege Misuse' },
                { title: 'Threat Category', value: 'Privilege Escalation' },
                { title: 'Sub Category', value: 'Privilege Escalation to Service Accounts' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'Adm-EMoor, WK-38482L' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '74' },
                { title: 'Resource', value: 'Windows' },
                { title: 'Indicators', value: 'TargetAccount, Groups, Event' }
            ]
        }
    ];

    ipHardCodeItemData = [
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
            threatCategories: [
                { title: 'Kill Chain', value: 'C2' },
                { title: 'Threat Category', value: 'Malicious Behavior' },
                { title: 'Sub Category', value: 'P2P Traffic' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: '10.82.32.227' },
                { title: 'Locations', value: 'Indonesia' },
                { title: 'Risk', value: '95' },
                { title: 'Resources', value: 'Proxy' },
                { title: 'Indicators', value: 'DstIP, URL, Category, BytesOut' }
            ],
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
            threatCategories: [
                { title: 'Last Hostname', value: 'WK-UKL48503D' },
                { title: 'Last IP', value: '10.82.32.212' }
            ],
            additionalInfo: [
                { title: 'New Hostname', value: 'WK-UKL48503D' },
                { title: 'New IP', value: '10.82.32.227' }
            ],
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
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Malicious Behavior' },
                { title: 'Sub Category', value: 'Inbound SMB' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: '10.82.32.212' },
                { title: 'Locations', value: 'Indonesia' },
                { title: 'Risk', value: '74' },
                { title: 'Resources', value: 'Netflow' },
                { title: 'Indicators', value: 'SrcIP, DstIP, DstPort' }
            ],
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
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Malicious Behavior' },
                { title: 'Sub Category', value: 'Inbound Telnet' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: '10.82.32.212' },
                { title: 'Locations', value: 'Indonesia' },
                { title: 'Risk', value: '63' },
                { title: 'Resources', value: 'Netflow' },
                { title: 'Indicators', value: 'SrcIP, DstIP, DstPort, Threat Intelligence' }
            ],
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
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Port Scanning' },
                { title: 'Sub Category', value: 'Inbound Attack' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: '10.82.32.212' },
                { title: 'Locations', value: 'Indonesia' },
                { title: 'Risk', value: '54' },
                { title: 'Resources', value: 'Netflow' },
                { title: 'Indicators', value: 'SrcIP, DstIP, DstPort' }
            ],
            description: 'This Violation is triggered when Port Scanning operation is detected from External IP'
        }
    ];

    incidentAwender = false;
    incidentName: any;

    ngAfterViewInit() {
        if (!this.incidentDetail) {
            this.zone.runOutsideAngular(() => {
                // Initialize Guage meter chart
                this.initializeGuageMeterChart();

                // Initialize Bubble chart
                this.initializeBubbleChart();
            });
        }
    }

    initializeGuageMeterChart() {

        am4core.useTheme(am4themes_animated);
        // create chart
        var chart = am4core.create('chartGuageDiv', am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.innerRadius = -20;

        // Set cell size in pixels
        let cellSize = 30;
        chart.events.on('datavalidated', function (ev) {

            // Get objects of interest
            let chart = ev.target;
            /* let categoryAxis = chart.yAxes.getIndex(0);
        
            // Calculate how we need to adjust chart height
            let adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
        
            // get current chart height
            let targetHeight = chart.pixelHeight + adjustHeight; */

            // Set it on chart's container
            // chart.svgContainer.htmlElement.style.height = 350 + "px";
        });

        // start and end angle
        /* chart.startAngle = 360;
        chart.endAngle = 0; */

        var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor('background');
        axis.renderer.grid.template.strokeOpacity = 0.3;

        // axis.fontSize = 0;
        /* axis.hidden = false;
        axis.fixedWidthGrid = true; */

        // axis.renderer.ticks.template.length = 35;
        // axis.renderer.grid.template.disabled = true;
        axis.fontSize = 12;
        axis.renderer.labels.template.radius = 4;   // space b/w meter and number
        /* axis.renderer.labels.template.adapter.add("text", function (text) {
            return text + "%";
        }) */

        var range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 65;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = am4core.color('greenyellow');
        range0.axisFill.zIndex = -1;

        var range1 = axis.axisRanges.create();
        range1.value = 65;
        range1.endValue = 79;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color('darkorange');
        range1.axisFill.zIndex = -1;

        var range2 = axis.axisRanges.create();
        range2.value = 79;
        range2.endValue = 100;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color('crimson');
        range2.axisFill.zIndex = -1;

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = this.userData.score;
        hand.fill = am4core.color('#2D93AD');   // hand color
        hand.stroke = am4core.color('#2D93AD');

        // using chart.setTimeout method as the timeout will be disposed together with a chart
        /* chart.setTimeout((randomValue), 2000);

        function randomValue() {
            hand.showValue(this.userData.score, 1000, am4core.ease.cubicOut);
            chart.setTimeout(randomValue, 2000);
        } */
    }

    initializeBubbleChart() {

        // Apply chart themes
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create('bubbleChartdiv', am4charts.XYChart);

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.DateAxis());
        //xAxis.dataFields.category = "date";

        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        yAxis.dataFields.category = 'hour';

        xAxis.dateFormats.setKey('day', 'MMM dd, yyyy');
        xAxis.periodChangeDateFormats.setKey('day', 'MMM dd, yyyy');

        xAxis.renderer.grid.template.disabled = false; // vertical line middle on the bubbles
        yAxis.renderer.grid.template.disabled = false; // Horizontal border line for the bubbles
        xAxis.renderer.axisFills.template.disabled = true; // vertical border - one by one column , not for all
        yAxis.renderer.axisFills.template.disabled = true; // horizontal border - one by one column , not for all
        yAxis.renderer.ticks.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = 'hour';
        series.dataFields.dateX = 'date';
        series.dataFields.value = 'value';
        series.columns.template.disabled = true; // background color for the columns
        series.sequencedInterpolation = true;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color('#2D93AD');
        series.defaultState.transitionDuration = 1000;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.tooltipText = '[bold, black]{policyViolated} : {value}';
        bullet.background.fill = am4core.color('black');
        bullet.strokeWidth = 2;
        bullet.stroke = am4core.color('#ffffff');
        bullet.propertyFields.fill = 'color'; // provide dynamic color for bubbles
        bullet.strokeOpacity = 0;

        // tooltip rendering on the bubble
        bullet.adapter.add('tooltipY', (tooltipY, target) => {
            return 1; // -target.circle.radius + 1;
        });

        // size of the bubble increment
        series.heatRules.push({ property: 'radius', target: bullet.circle, min: 6, max: 12 });

        bullet.hiddenState.properties.scale = 0.01;
        bullet.hiddenState.properties.opacity = 1;
        var hoverState = bullet.states.create('hover');
        hoverState.properties.strokeOpacity = 1;

        for (var x in bubbleDataMonth) {
            if (bubbleDataMonth[x].value > 0 && bubbleDataMonth[x].value <= 1) {
                bubbleDataMonth[x].color = '#FFFF00';
            } else if (bubbleDataMonth[x].value > 1 && bubbleDataMonth[x].value <= 3) {
                bubbleDataMonth[x].color = '#FFA500';
            } else if (bubbleDataMonth[x].value > 3) {
                bubbleDataMonth[x].color = '#f00';
            }
        }

        chart.data = bubbleDataMonth;

        // Add scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = 'zoomXY';
    }

    routeToIncident(incident) {
        this.router.navigate(['/incidentSummary', incident]);
    }

    routeToPerformRemediation(performRemediationTitle: string) {
        this.performRemediationService.performRemediationTitle = performRemediationTitle;
        this.router.navigate(['/performRemediation'])
    }

    switchView(view) {
        this.selectedView = view;
    }

    getAllUsers() {
        this.riskyUserService.getUploadExceedData(this.offset).subscribe((res: any) => {
            this.totalRecords = res._totalRecords;
            this.allUsers = this.allUsers.concat(res.data);
            this.allUsers.sort((a, b) => {
                return b.riskscore - a.riskscore;
            });
            this.recordsReturned = this.allUsers.length;
        });
    }

    goToSummaryPage() {
        this.router.navigateByUrl('/policyViolationSummary');
    }

    loadMoreUsers() {
        this.offset++;
        this.getAllUsers();
    }

    open(ruilId, userId, isotimestamp) {
        const modalRef = this.modalService.open(RiskScoreModalComponent, { backdrop: 'static' }); // { size: 'sm' }
        modalRef.componentInstance.ruilId = ruilId;
        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.isotimestamp = isotimestamp;
    }

    gotoSummery() {
        window.open('#/policyViolationSummary', '_blank');
    }

    goToIncident() {
        window.open('#/incidentSummary', '_blank');
    }

    openUserInfo(userInfo: any) {
        const modalRef = this.modalService.open(RiskyUserInfoModalComponent, { size: 'lg' });
        modalRef.componentInstance.userInfo = userInfo;
    }

    changeChartDateRange(dateRange: string) {
        this.selectedDateRange = dateRange;
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65) {
            return 'greenyellow';
        } else if (riskScore > 65 && riskScore <= 79) {
            return 'darkorange';
        } else {
            return 'crimson';
        }
    }

}
