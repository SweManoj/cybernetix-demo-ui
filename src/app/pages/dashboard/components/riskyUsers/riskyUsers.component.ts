import { Component, NgZone } from '@angular/core';
import { RiskyUserService } from './riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RiskyUserInfoModalComponent } from './risky-user-info-modal/risky-user-info-modal.component';
import { bubbleDataMonth } from './data';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { AmChartsService } from '@amcharts/amcharts3-angular';
import { RiskScoreModalComponent } from './risk-score-modal/risk-score-modal.component';
import { TopDetailsService } from '../topDetails/topDetails.service';

@Component({
    selector: 'risky-users',
    templateUrl: './riskyUsers.component.html'
})
export class RiskyUsersComponent {

    selectedUser: string = null;
    allUsers: any = [];
    selectedDateRange: string;
    dateRanges = ['1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year'];
    totalRecords: number = 0;
    recordsReturned: number = 0;
    selectedUserDetails: any = {};
    selectedView = 'timeline';
    private offset: number = 0;
    selectedUserInfo: any[];

    hardCodeItemDataForDemoForEmoor: any[];
    hardCodeItemDataForDemoForMendelson = [];
    userData: any;
    riskyObjects = [
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
        /* {
            type: 'user',
            value: 'SSmith1',
            score: 90,
            img: true,
            role: 'Sr. Software Engineer',
            department: ' IT Security',
            location: 'San Diego',
            reportingManager: 'John Brown',
            creationDate: '13th Oct 2016',
            lastWorkDay: '-'
        }, */
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
    ];

    additionalInfo = [
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
        }
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
                { title: 'Risk', value: '93' },
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
                { title: 'Risk', value: '91' },
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
                { title: 'Risk', value: '87' },
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
                { title: 'Risk', value: '81' },
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
                { title: 'Risk', value: '63' },
                { title: 'Resource', value: 'Guardium' },
                { title: 'Indicators', value: 'Event, Accountname' }
            ]
        },
    ];

    glenRobertoHardCodeItemData = [
        {
            generatedDateFormat: '29 Sep 2019',
            generatedTimestamp: '12:05:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 9,
            ruleInfo: {
                ruleId: 1,
                title: 'Suspicious login activities observed from Contractor/Vendor/Partner'
            },
            incId: 'INC-1',
            description: 'This anomaly is flagged when there is abnormal number of login activities observed from a Contractor/Vendor/Partner - Spike in login actiity, rare login activity, unusual business time are the key contributors to this anomlay',
            threatCategories: [
                { title: 'Kill Chain', value: 'Abnormal Activities' },
                { title: 'Threat Category', value: 'Abnormal Activities' },
                { title: 'Sub Category', value: 'Abnormal Activities' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'Glenn_Roberto, 10.82.34.109, 10.82.34.101, 10.82.34.102, 10.82.34.104, 172.168.200.51, 172.168.200.52, 172.168.200.53, 172.168.200.54' },
                { title: 'Location', value: '-' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Windows' },
                { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, DeviceIP, SourceIP' }
            ]
        }
    ];

    hardCodeItemData: any = [
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
        }/* ,
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '17:14:00',
            accord: false,
            pv: 'PV_094',
            riskScore: 149,
            ruleInfo: {
                ruleId: 6,
                title: 'Multiple Users Logged-In Successfully From Same IP'
            },
            incId: 'INC-6',
            description: 'This Violation is triggered when user exfiltrates excissive bytes of data via HTTPS',
            threatCategories: {
                'Kill Chain': 'Data Exfiltration',
                'Threat Category': 'Data Exfiltration',
                'Sub Category': 'Data Exfiltration via HTTPS'
            },
            additionalInfo: {
                'Affected Entity': 'SVL-EMoor, WK-38482L',
                'Location': 'San Diego',
                'Status': 'Risk: 95',
                'Resource': 'Proxy',
                'Indicators': 'URL, BytesOut, Event'
            }
        } */
    ];

    policyViolationForUser1 = [
        {
            generatedDateFormat: '27th Jul 2019',
            generatedTimestamp: '09:01:00',
            accord: false,
            pv: 'PV_034',
            riskScore: 165,
            ruleInfo: {
                ruleId: 6,
                title: 'Abnormal Objects Accessed - Fileshare'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Suspicious/Malicious Behavior' },
            { title: 'Threat Category', value: 'Network Traversing' },
            { title: 'Sub Category', value: 'Network Traversing' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Adm-ADittmer' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '90' },
            { title: 'Resources', value: 'NetApp' },
            { title: 'Indicators', value: 'Filenames' }],
            description: 'This violation is flagged when there are unusual number of objects accessed as per User’s past pattern. '
        },
        {
            generatedDateFormat: '27th Jul 2019',
            generatedTimestamp: '08:45:00',
            accord: false,
            pv: 'PV_032',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Successful Logon on Rare Host - Windows'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Account Compromise' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Successful Logon' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'SSmith' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'NetApp' },
            { title: 'Indicators', value: 'EventType, Workstationname' }],
            description: 'This violation is flagged when there is suspicious successful logon on a Rare Host.'
        },
        {
            generatedDateFormat: '27th Jul 2019',
            generatedTimestamp: '08:12:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 19,
            ruleInfo: {
                ruleId: 6,
                title: 'Failed Attempts on Rare Host - Windows'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Account Compromise' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Failed Attempts' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'SSmith1' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '74' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'EventType, Workstationname' }],
            description: 'This violation is flagged when there are unusual number of failed attempts on a Rare Host'
        },
        {
            generatedDateFormat: '27th Jul 2019',
            generatedTimestamp: '07:42:00',
            accord: false,
            pv: 'PV_023',
            riskScore: 3,
            ruleInfo: {
                ruleId: 6,
                title: 'Unusal Badge Activity during Off-Hours '
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: 'Insider Threat' },
            { title: 'Threat Category', value: 'Suspicious/Malicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious/Malicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'SSmith1' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '53' },
            { title: 'Resources', value: 'Badge' },
            { title: 'Indicators', value: 'EventTime' }],
            description: 'This violation is flagged when there is an abnormal badge access during off-hours as per User’s past pattern'
        }
    ];

    policyViolationForHeidy = [
        {
            generatedDateFormat: '17th Jul 2019',
            generatedTimestamp: '19:12:00',
            accord: false,
            pv: 'PV_034',
            riskScore: 13,
            ruleInfo: {
                ruleId: 6,
                title: 'Email to Competitors  - O365'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Email' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Heidy' },
            { title: 'Locations', value: 'Los Angeles' },
            { title: 'Risk', value: '88' },
            { title: 'Resources', value: 'O365' },
            { title: 'Indicators', value: 'RecipientID, ThreatIntel' }],
            description: ' This violation is flagged when there is email sent to competitor domain'
        },
        {
            generatedDateFormat: '17th Jul 2019',
            generatedTimestamp: '13:42:00',
            accord: false,
            pv: 'PV_034',
            riskScore: 27,
            ruleInfo: {
                ruleId: 6,
                title: 'Unusual Export on Database - GCP'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Export' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Heidy' },
            { title: 'Locations', value: 'Los Angeles' },
            { title: 'Risk', value: '65' },
            { title: 'Resources', value: 'GCP' },
            { title: 'Indicators', value: 'Event, Tables' }],
            description: 'This violation is flagged when there is abnormal export on Database as per User’s past pattern'
        }
    ];

    policyViolationForMaile = [
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '06:47:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Self Escalation Removed Security enabled global group'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description: 'In this Algorithm, User Removed security enabled global group'
        },
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '05:43:00',
            accord: false,
            pv: 'PV_013',
            riskScore: 18,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Data Export on MSQL database'
            },
            incId: 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Export' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '81' },
            { title: 'Resources', value: 'Salesforce' },
            { title: 'Indicators', value: 'Action/Tables' }],
            description: 'In this Algorithm, user performed abnormal data export on MSQL database'
        },
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Self Escalation Added Security enabled global group'
            },
            incId: 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '72/87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description: 'In this Algorithm, User Added security enabled global group'
        }
    ];

    policyViolationForMendelson = [
        {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '17:34:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Abnormal Applications Accessed'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Suspicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'Florida' },
            { title: 'Risk', value: '82' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'AppNames' }],
            description: 'This Violation is triggered when rare applications has been accessed as per User’s past pattern'
        },
        {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '16:45:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Successful Logon from Rare Location- VPN'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Potential Account Compromise' },
            { title: 'Sub Category', value: 'Potential Account Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'Florida' },
            { title: 'Risk', value: '76' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Location' }],
            description: 'This Violation is triggered when VPN activity is observed from rare location'
        },
        {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '14:34:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: ' Activity By Dormant Account'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Potential Account Compromise' },
            { title: 'Sub Category', value: 'Potential Account Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'Florida' },
            { title: 'Risk', value: '67' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Id' }],
            description: 'This Violation is triggered when activity is seen for a dormant user'
        }

    ];

    difDateViolations;
    difDateVio_ScottEdwin = [
        {
            violationDate: '02 Oct 2019',
            violations: [
                {
                    generatedDateFormat: '2 Oct 2019',
                    generatedTimestamp: '03:43:00',
                    accord: false,
                    pv: 'INC_17',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 6,
                        title: 'Suspicious Login Activities from Rare Subnet'
                    },
                    incId: 'INC-17',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Rare Subnet' },
                        { title: 'Threat Category', value: 'Rare Subnet' },
                        { title: 'Sub Category', value: 'Rare Subnet' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin, 172.34.123.1' },
                        { title: 'EventDescription', value: 'Login Successful' },
                        { title: 'Normal Pattern', value: '10.82.x' },
                        { title: 'Risk', value: '92' },
                        { title: 'Resource', value: 'Web Application' },
                        { title: 'Indicators', value: 'Accountname, EventDescription, SourceIP' }],
                    description: 'This anomaly is flagged when login activities are observed from Rare Subnet as per user / system past behavior'
                },
                {
                    generatedDateFormat: '2 Oct 2019',
                    generatedTimestamp: '03:43:00',
                    accord: false,
                    pv: 'INC_41',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 6,
                        title: 'Suspicious Login Activities during off-hours'
                    },
                    incId: 'INC-41',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Off-Hour Activities' },
                        { title: 'Threat Category', value: 'Off-Hour Activities' },
                        { title: 'Sub Category', value: 'Off-Hour Activities' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin, 172.34.123.1' },
                        { title: 'EventDescription', value: 'Login Successful' },
                        { title: 'Normal Pattern', value: '9:34am - 5:47pm' },
                        { title: 'Risk', value: '84' },
                        { title: 'Resource', value: 'Web Application' },
                        { title: 'Indicators', value: 'Accountname, EventDescription, EventTime' }],
                    description: 'This anomaly is flagged when login activities are observed during off-hour as per user / system past behavior'
                }
            ]
        },
        {
            violationDate: '01 Oct 2019',
            violations: [
                {
                    generatedDateFormat: '1 Oct 2019',
                    generatedTimestamp: '02:34:00',
                    accord: false,
                    pv: 'INC_67',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 1,
                        title: 'Potential Phishing Email Attack - Ironport'
                    },
                    incId: 'INC-67',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Phishing Attack' },
                        { title: 'Threat Category', value: 'Phishing Attack' },
                        { title: 'Sub Category', value: 'Phishing Attack' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin' },
                        { title: 'Sender', value: 'jinvik@web19.profiwk.com' },
                        { title: 'Recipients', value: '37' },
                        { title: 'Risk', value: '81' },
                        { title: 'Resource', value: 'Ironport' },
                        { title: 'Indicators', value: 'Sender, Recipient, Subject, Size' }],
                    description: 'This anomaly is flagged when Inbound email sent from same sender to multiple recipients having same subject and same attachment size'
                }
            ]
        }
    ];

    difDateVio_TVDE23 = [
        {
            violationDate: '14 Oct 2019',
            violations: [
                {
                    generatedTimestamp: '17:23:00',
                    accord: false,
                    pv: 'IN 039',
                    riskScore: 3,
                    ruleInfo: {
                        ruleId: 3,
                        title: 'Potential Data Exfiltration to External IP'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Data Exfiltration' },
                        { title: 'Threat Category', value: 'Data Exfiltration' },
                        { title: 'Sub Category', value: 'Data Exfiltration' }],
                    additionalInfo: [
                        { title: 'SourceIP', value: '10.82.71.192' },
                        { title: 'DestinationIP', value: '10.82.69.151' },
                        { title: 'DestinationPort', value: '21' },
                        { title: 'Packet Size', value: '10.3MB' },
                        { title: 'Risk', value: '91' },
                        { title: 'Resources', value: 'NetFlow' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                    description: 'This anomaly is flagged when there is Unusual Communication with Rare Port/IP'
                },
                {
                    generatedTimestamp: '17:23:00',
                    accord: false,
                    pv: 'IN 039',
                    riskScore: 3,
                    ruleInfo: {
                        ruleId: 3,
                        title: 'Potential Data Exfiltration to External IP'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Data Exfiltration' },
                        { title: 'Threat Category', value: 'Data Exfiltration' },
                        { title: 'Sub Category', value: 'Data Exfiltration' }],
                    additionalInfo: [
                        { title: 'SourceIP', value: '10.82.71.192' },
                        { title: 'DestinationIP', value: '10.82.69.151' },
                        { title: 'DestinationPort', value: '21' },
                        { title: 'Packet Size', value: '10.3MB' },
                        { title: 'Risk', value: '91' },
                        { title: 'Resources', value: 'NetFlow' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                    description: 'This anomaly is flagged when there is Unusual Communication with Rare Port/IP'
                }
            ]
        },
        {
            violationDate: '10 Oct 2019',
            violations: [
                {
                    generatedTimestamp: '17:23:00',
                    accord: false,
                    pv: 'IN 021',
                    riskScore: 19,
                    ruleInfo: {
                        ruleId: 19,
                        title: 'Unusual Internal Communication with Rare Port/IP'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Communication with Rare Port/IP' },
                        { title: 'Threat Category', value: 'Communication with Rare Port/IP' },
                        { title: 'Sub Category', value: 'Communication with Rare Port/IP' }],
                    additionalInfo: [
                        { title: 'SourceIP', value: '10.82.71.192' },
                        { title: 'DestinationIP', value: '10.82.69.147' },
                        { title: 'DestinationPort', value: '443' },
                        { title: 'Risk', value: '92' },
                        { title: 'Resources', value: 'NetFlow' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                    description: 'This anomaly is flagged when there is Unusual Communication with Rare Port/IP'
                }
            ]
        },
        {
            violationDate: '09 Oct 2019',
            violations: [
                {
                    generatedTimestamp: '17:12:00',
                    accord: false,
                    pv: 'IN 052',
                    riskScore: 17,
                    ruleInfo: {
                        ruleId: 17,
                        title: 'Unusual Internal Communication with Rare Port/IP'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Communication with Rare Port/IP' },
                        { title: 'Threat Category', value: 'Communication with Rare Port/IP' },
                        { title: 'Sub Category', value: 'Communication with Rare Port/IP' }],
                    additionalInfo: [
                        { title: 'SourceIP', value: '10.82.71.192' },
                        { title: 'DestinationIP', value: '10.82.68.143' },
                        { title: 'DestinationPort', value: '139' },
                        { title: 'Risk', value: '91' },
                        { title: 'Resources', value: 'NetFlow' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                    description: 'This anomaly is flagged when there is Unusual Communication with Rare Port/IP'
                }
            ]
        },
        {
            violationDate: '07 Oct 2019',
            violations: [
                {
                    generatedTimestamp: '12:33:00',
                    accord: false,
                    pv: 'IN 019',
                    riskScore: 4,
                    ruleInfo: {
                        ruleId: 4,
                        title: 'Malware Found on Critical Server'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Malware Found' },
                        { title: 'Threat Category', value: 'Malware Found' },
                        { title: 'Sub Category', value: 'Malware Found' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: '10.82.71.192' },
                        { title: 'Severity', value: 'Medium' },
                        { title: 'Malware', value: 'malware.binary' },
                        { title: 'Risk', value: '89' },
                        { title: 'Resources', value: 'FireEye' },
                        { title: 'Indicators', value: 'SourceIP, MalwareType, Severity' }],
                    description: 'This anomaly is flagged when malware is found on Critical server'
                }
            ]
        },
        {
            violationDate: '06 Oct 2019',
            violations: [
                {
                    generatedTimestamp: '14:53:00',
                    accord: false,
                    pv: 'IN 033',
                    riskScore: 18,
                    ruleInfo: {
                        ruleId: 18,
                        title: 'Abnormal Batch Process Execution'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Batch Process Execution' },
                        { title: 'Threat Category', value: 'Batch Process Execution' },
                        { title: 'Sub Category', value: 'Batch Process Execution' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: '10.82.71.192' },
                        { title: 'EventCode', value: '4688' },
                        { title: 'LogonType', value: '4 (Batch)' },
                        { title: 'Risk', value: '87' },
                        { title: 'Process', value: 'Powershell' },
                        { title: 'Resources', value: 'Windows Security' },
                        { title: 'Indicators', value: 'EventCode, LogonType, SourceIP, ProcessName' }],
                    description: 'This anomaly is flagged when abnormal batch process is executed on Server'
                }
            ]
        },
        {
            violationDate: '05 Oct 2019',
            violations: [
                {
                    generatedDateFormat: 'Oct 5 2019',
                    generatedTimestamp: '08:50:00',
                    accord: false,
                    pv: 'IN 0371',
                    riskScore: 47,
                    ruleInfo: {
                        ruleId: 47,
                        title: 'Unusual Network scanning Activities Identified from Server'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Lateral Movement' },
                        { title: 'Threat Category', value: 'Lateral Movement' },
                        { title: 'Sub Category', value: 'Lateral Movement' }],
                    additionalInfo: [
                        { title: 'Source IP', value: '10.82.34.107' },
                        { title: 'DestinationIP', value: '10.82.34.101, 10.82.34.102, 10.82.34.104, 10.82.34.111, 10.82.34.117, 10.82.34.192, 10.82.71.129, 10.82.71.192..' },
                        { title: 'Count of DestinationIP', value: '43' },
                        { title: 'DestinationPort', value: '139, 445' },
                        { title: 'Risk', value: '93' },
                        { title: 'Resources', value: 'NetFlow' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                    description: 'This anomaly is flagged when there is potential network scanning activity observed from internal IP'
                }
            ]
        },
        {
            violationDate: '04 Oct 2019',
            violations: [
                {
                    generatedDateFormat: 'Oct 4 2019',
                    generatedTimestamp: '17:22:00',
                    accord: false,
                    pv: 'IN 011',
                    riskScore: 93,
                    ruleInfo: {
                        ruleId: 93,
                        title: 'Abnormal SQL Concatenation Patterns Received on Database Server'
                    },
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Potential SQL Injection' },
                        { title: 'Threat Category', value: 'Potential SQL Injection' },
                        { title: 'Sub Category', value: 'Potential SQL Injection' }],
                    additionalInfo: [
                        { title: 'Source IP', value: '172.34.123.1' },
                        { title: 'Affected Entity', value: '10.82.34.107' },
                        { title: 'Requested File', value: 'dump_database.php, wp-login.php, admin-ajax.php' },
                        { title: 'EventDescription', value: 'Successful' },
                        { title: 'Risk', value: '87' },
                        { title: 'Resources', value: 'Apache Access Logs' },
                        { title: 'Indicators', value: 'SourceIP, DestinationIP, RequestedFile, EventDescription' }],
                    description: 'This anomaly is flagged when there is an attempt to execute rare & unusual SQL queries on Database server'
                }
            ]
        },
        {
            violationDate: '02 Oct 2019',
            violations: [
                {
                    generatedDateFormat: '2 Oct 2019',
                    generatedTimestamp: '03:43:00',
                    accord: false,
                    pv: 'IN 077',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 6,
                        title: 'Suspicious Login Activities from Rare Subnet'
                    },
                    incId: 'INC-17',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Rare Subnet' },
                        { title: 'Threat Category', value: 'Rare Subnet' },
                        { title: 'Sub Category', value: 'Rare Subnet' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin, 172.34.123.1' },
                        { title: 'EventDescription', value: 'Login Successful' },
                        { title: 'Normal Pattern', value: '10.82.x' },
                        { title: 'Risk', value: '92' },
                        { title: 'Resource', value: 'Web Application' },
                        { title: 'Indicators', value: 'Accountname, EventDescription, SourceIP' }],
                    description: 'This anomaly is flagged when login activities are observed from Rare Subnet as per user / system past behavior'
                },
                {
                    generatedDateFormat: '2 Oct 2019',
                    generatedTimestamp: '03:43:00',
                    accord: false,
                    pv: 'IN 041',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 6,
                        title: 'Suspicious Login Activities during off-hours'
                    },
                    incId: 'INC-41',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Off-Hour Activities' },
                        { title: 'Threat Category', value: 'Off-Hour Activities' },
                        { title: 'Sub Category', value: 'Off-Hour Activities' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin, 172.34.123.1' },
                        { title: 'EventDescription', value: 'Login Successful' },
                        { title: 'Normal Pattern', value: '9:34am - 5:47pm' },
                        { title: 'Risk', value: '84' },
                        { title: 'Resource', value: 'Web Application' },
                        { title: 'Indicators', value: 'Accountname, EventDescription, EventTime' }],
                    description: 'This anomaly is flagged when login activities are observed during off-hour as per user / system past behavior'
                }
            ]
        },
        {
            violationDate: '01 Oct 2019',
            violations: [
                {
                    generatedDateFormat: '1 Oct 2019',
                    generatedTimestamp: '02:34:00',
                    accord: false,
                    pv: 'IN 067',
                    riskScore: 1,
                    ruleInfo: {
                        ruleId: 1,
                        title: 'Potential Phishing Email Attack - Ironport'
                    },
                    incId: 'IN 091',
                    threatCategories: [
                        { title: 'Kill Chain', value: 'Phishing Attack' },
                        { title: 'Threat Category', value: 'Phishing Attack' },
                        { title: 'Sub Category', value: 'Phishing Attack' }],
                    additionalInfo: [
                        { title: 'Affected Entity', value: 'Scott_Edwin' },
                        { title: 'Sender', value: 'jinvik@web19.profiwk.com' },
                        { title: 'Recipients', value: '37' },
                        { title: 'Risk', value: '81' },
                        { title: 'Resource', value: 'Ironport' },
                        { title: 'Indicators', value: 'Sender, Recipient, Subject, Size' }],
                    description: 'This anomaly is flagged when Inbound email sent from same sender to multiple recipients having same subject and same attachment size'
                }
            ]
        }
    ];

    hardCodeItemDataForDemoForJohn1 = [
        {
            generatedDateFormat: '2 Aug 2019',
            generatedTimestamp: '20:45:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Excessive Remote Access Tools Usage'
            },
            incId: 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Suspicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '87' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'Bytes, Category' }],
            description: 'This policy violation is triggered when user attempted to access remote access tools '
        },
        {
            generatedDateFormat: '2 Aug 2019',
            generatedTimestamp: '19:23:00',
            accord: false,
            pv: 'PV_013',
            riskScore: 18,
            ruleInfo: {
                ruleId: 5,
                title: 'Unauthorized Software Downloaded By Contractor'
            },
            incId: 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Suspicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '83' },
            { title: 'Resources', value: 'SCCM' },
            { title: 'Indicators', value: 'Action' }],
            description: 'This policy violation is triggered when there is unauthorized software downloaded by an external user'
        },
        {
            generatedDateFormat: '31 July 2019',
            generatedTimestamp: '17:00:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: ' Abnormal Software Downloads Attempts by Contractor'
            },
            incId: 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Suspicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '70' },
            { title: 'Resources', value: 'SCCM' },
            { title: 'Indicators', value: 'Action' }],
            description: 'This policy violation is triggered when there is sudden spike in software downloads attempts for an external user'
        },
        {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '13:23:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: ' Abnormal Software Downloads Attempts by Contractor'
            },
            incId: 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '67' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description: 'In this Algorithm, user performed abnormal data export on MSQL database'
        }


    ];

    hardCodeItemDataForDemoForJohn2 = [
        {
            generatedDateFormat: '31 July 2019',
            generatedTimestamp: '17:00:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: ' Abnormal Software Downloads Attempts by Contractor'
            },
            incId: 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '70' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description: 'In this Algorithm, user performed abnormal data export on MSQL database'
        }

    ];

    hardCodeItemDataForDemoForJohn3 = [
        {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '13:23:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: ' Abnormal Software Downloads Attempts by Contractor'
            },
            incId: 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Risk', value: '67' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description: 'In this Algorithm, user performed abnormal data export on MSQL database'
        }
    ];

    hardCodeItemDataForDemo1 = [
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '06:22:00',
            accord: false,
            pv: 'PV_092',
            riskScore: 19,
            ruleInfo: {
                ruleId: 6,
                title: 'Data Exfiltration to Cloud via HTTPS'
            },
            incId: 'INC-7',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Exfiltration' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '97' },
            { title: 'Resources', value: 'DLP' },
            { title: 'Indicators', value: 'URL, Attachment' }],
            description: 'In this Algorithm, User attempted to exfiltrate excessive data to Cloud via HTTPS'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_059',
            riskScore: 118,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Objects Accessed on Fileshare'
            },
            incId: 'INC-8',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Abnormal Pattern' },
            { title: 'Sub Category', value: 'Abnormal Pattern' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '91' },
            { title: 'Resources', value: 'Fileshare' },
            { title: 'Indicators', value: 'FileName' }],
            description: 'In this Algorithm, Multiple Objects Accessed or Downloaded By User on Fileshare in short span'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 23,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious RDP to Multiple Hosts from Privileged User'
            },
            incId: 'INC-9',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'EventID' }],
            description: 'In this Algorithm, Suspicious RDP to Multiple Hosts from Single Host as per historical baselining & Static Peer Grouping'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '02:45:00',
            accord: false,
            pv: 'PV_021',
            riskScore: 17,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal Remote Access Tools Usage'
            },
            incId: 'INC-11',
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Suspicious Behavior' },
                { title: 'Sub Category', value: 'Suspicious Behavior' }
            ],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '84' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'Category' }],
            description: 'In this Algorithm, Suspicious Remote Access Tools Usage By User as per historical baselining & Static Peer Grouping'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '01:14:00',
            accord: false,
            pv: 'PV_033',
            riskScore: 2,
            ruleInfo: {
                ruleId: 1,
                title: 'Successful Login From Unusual Location - VPN'
            },
            incId: 'INC-12',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Ukraine' },
            { title: 'Risk', value: '75' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Location' }],
            description: 'In this Algorithm, Successful Login Attempts on VPN from Unusual Location'
        }


    ];

    hardCodeItemDataForDemo2 = [
        {
            generatedDateFormat: '12 June 2019',
            generatedTimestamp: '08:02:00',
            accord: false,
            pv: 'PV_043',
            riskScore: 9,
            ruleInfo: {
                ruleId: 1,
                title: 'Multiple Failed Login Attempts From Unusual Location - VPN'
            },
            incId: 'INC-13',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Ukraine' },
            { title: 'Risk', value: '75' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Location' }]
        },
        {
            generatedDateFormat: '12 June 2019',
            generatedTimestamp: '07:30:00',
            accord: false,
            pv: 'PV_088',
            riskScore: 13,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal VPN Activities after BadgeIN'
            },
            incId: 'INC-14',
            description: 'In this Algorithm, VPN Activities are observerd for User after Physical Badge IN',
            threatCategories:
                [{ title: 'Kill Chain', value: 'Actions/Maintain' },
                { title: 'Threat Category', value: 'Credentials Compromise' },
                { title: 'Sub Category', value: 'Credentials Compromise' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin, Ukraine' },
            { title: 'Risk', value: '74' },
            { title: 'Resources', value: 'Physical, VPN' },
            { title: 'Indicators', value: 'Location' }]

        }
    ];

    hardCodeItemDataForDemo3 = [
        {
            generatedDateFormat: '11 June 2019',
            generatedTimestamp: '05:20:00',
            accord: false,
            pv: 'PV_073',
            riskScore: 17,
            ruleInfo: {
                ruleId: 1,
                title: 'Multiple Failed Login Attempts From Unusual Location - VPN'
            },
            incId: 'INC-15',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Account Compromise' },
                { title: 'Sub Category', value: 'Account Compromise' }],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWendler' },
                { title: 'Locations', value: 'Ukraine' },
                { title: 'Risk', value: '57' },
                { title: 'Resources', value: 'VPN' },
                { title: 'Indicators', value: 'Location' }]
        }
    ];

    hardCodeItemDataForDemo4 = [
        {
            generatedDateFormat: '10 June 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_023',
            riskScore: 83,
            ruleInfo: {
                ruleId: 1,
                title: 'Outbound Traffic to Spyware URL’s from Privileged User'
            },
            incId: 'INC-16',
            Description: 'In this policy violation, User was trying to access URL(s) with Category: Malicious or Spyware',

            threatCategories: [
                { title: 'Kill Chain', 'value': '-' },
                { title: 'Threat Category', 'value': 'Malicious Behavior' },
                { title: 'SubCategory', 'value': 'Malicious Behavior' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWendler' },
                { title: 'Locations', value: 'Ukraine' },
                { title: 'Risk', value: '42' },
                { title: 'Resources', value: 'Proxy' },
                { title: 'Indicators', value: 'Category' }]
        }
    ];

    flightUserHardCodeItemData = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '01:08:00',
            accord: false,
            pv: 'PV_051',
            riskScore: 13,
            ruleInfo: {
                ruleId: 1,
                title: 'Rare Appliations Accessed'
            },
            incId: 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Suspicious Behavior' },
            { title: 'Sub Category', value: 'Suspicious Behavior' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Alysa' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Status', value: 'Risk 51' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'ApplicationName' }],
            description: 'This Violation is triggered when a user accessed multiple Rare Applications as per past pattern'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '04:42:00',
            accord: false,
            pv: 'PV_072',
            riskScore: 69,
            ruleInfo: {
                ruleId: 1,
                title: 'High Amount of Documents Printed'
            },
            incId: 'INC-20',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Documents Print' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Alysa' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '71' },
            { title: 'Resources', value: 'DLP' },
            { title: 'Indicators', value: 'DocumentName' }],
            description: 'This Violation is triggered when a user prints abnornal number of documents as per past pattern'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '06:37:00',
            accord: false,
            pv: 'PV_062',
            riskScore: 47,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal Self Email to Personal Domains - DLP '
            },
            incId: 'INC-21',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Alysa' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '78' },
            { title: 'Resources', value: 'Email' },
            { title: 'Indicators', value: 'RecipientID' }],
            description: 'This Violation is triggered when a user sends email to personal domains '
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '08:21:00',
            accord: false,
            pv: 'PV_047',
            riskScore: 113,
            ruleInfo: {
                ruleId: 3,
                title: 'Abnormal Visit to Job Sites'
            },
            incId: 'INC-22',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            additionalInfo: [{ title: 'Affected Entity', value: 'Alysa' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '82' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'Category, dstHost' }],
            description: 'This Violation is triggered when a user visits unusual number of job sites as per past pattern'
        }
    ];

    chenZhangActivities = [
        { image: 'falg@1x.png', value: '2.7K', title: 'Events' },
        { image: 'resources@1x.png', value: '04', title: 'Resources' },
        { image: 'Shape@1x.png', value: '01', title: 'Locations' },
        { image: 'violations@1x.png', value: '05', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ];

    glenRobertoActivities = [
        { image: 'falg@1x.png', value: '2.7K', title: 'Events' },
        { image: 'resources@1x.png', value: '04', title: 'Resources' },
        { image: 'Shape@1x.png', value: '01', title: 'Locations' },
        { image: 'violations@1x.png', value: '03', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ];

    AWS_S3_Instance01_data = [
        {
            generatedDateFormat: 'Oct 4 2019',
            generatedTimestamp: '03:50:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 188,
            ruleInfo: {
                ruleId: 1,
                title: "Excessive Bytes Exfiltrated via HTTPS from a cloud instance"
            },
            description: 'This violation is flagged when unusual (rare, privileged, spike) CLI commands executed in cloud instance',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-S3-Instance01, 11.3.4.6, 11.3.4.5, 11.3.4.8, 11.3.4.9' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '95' },
                { title: 'Resource', value: 'AWS Logs' },
                { title: 'Indicators', value: 'Event, CommandExecuted' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '03:50:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 118,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal access of critical file paths in Cloud storage"
            },
            description: 'This anomaly is flagged when a critical/sensitive file paths are accessed – rare file path accessed, spike in accessing file path, file access in un usual or non-business hours , high number of queries',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data exfiltration' },
                { title: 'Sub Category', value: 'Data exfiltration' },
                { title: 'Threat Category', value: 'Data exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-S3-Instance01, AWS-DomainEC2-Instance07, 18.10.9.1' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '92' },
                { title: 'Resource', value: 'AWS Logs' },
                { title: 'Indicators', value: 'Event, Accountname, SrcIP, DestinationIP, CloudServer, objName' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '03:50:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 26,
            ruleInfo: {
                ruleId: 1,
                title: "Suspicious/Privileged commands executed in Cloud Instance"
            },
            description: 'This violation is flagged when unusual (rare, privileged, spike) CLI commands executed in cloud instance',
            threatCategories: [
                { title: 'Kill Chain', value: 'Privilege Misuse' },
                { title: 'Sub Category', value: 'Privilege Misuse' },
                { title: 'Threat Category', value: 'Privilege Misuse' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-S3-Instance01, AWS-DomainEC2-Instance07, 18.10.9.1' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '90' },
                { title: 'Resource', value: 'AWS Logs' },
                { title: 'Indicators', value: 'Event, CommandExecuted' }
            ]
        },
        {
            generatedDateFormat: 'Oct 1 2019',
            generatedTimestamp: '00:50:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Suspicious activity towards critical cloud data storage"
            },
            description: 'This violation is flagged when abnormal access of critical S3 bucket is observed in cloud logs. Rare IP, Spike in number of activities, Un-unusual business time contribute to this Anomaly',
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Sub Category', value: 'Suspicious Database Access' },
                { title: 'Threat Category', value: '-' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-S3-Instance01, AWS-DomainEC2-Instance07, 18.10.9.1' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'AWS Access Logs' },
                { title: 'Indicators', value: 'Event, Accountname, SrcIP, DestinationIP, Count of Activities, CloudServer' }
            ]
        }
    ];

    AWS_DomainEC2_Instance07_data = [
        {
            generatedDateFormat: 'Sep 29 2019',
            generatedTimestamp: '13:07:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 8,
            ruleInfo: {
                ruleId: 1,
                title: "Suspicious cloud IAM activities observed"
            },
            description: 'This violation is flagged when unusual (rare, privileged) IAM realted commands executed in cloud instance which can indicate access mining and probable recon activity',
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Sub Category', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Reconnaissance' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-DomainEC2-Instance07, 18.10.9.1' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '83' },
                { title: 'Resource', value: 'AWS EC2 Logs' },
                { title: 'Indicators', value: 'Event, CommandExecuted' }
            ]
        },
        {
            generatedDateFormat: 'Sep 27 2019',
            generatedTimestamp: '10:13:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 35,
            ruleInfo: {
                ruleId: 1,
                title: "Potential scanning attempts on Public facing cloud instance"
            },
            description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP',
            threatCategories: [
                { title: 'Kill Chain', value: 'Reconnaissance' },
                { title: 'Sub Category', value: 'Reconnaissance' },
                { title: 'Threat Category', value: 'Reconnaissance' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-DomainEC2-Instance07,AWS-DomainEC2-Instance13,AWS-DomainEC2-Instance29,AWS-DomainEC2-Instance38' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '65' },
                { title: 'Resource', value: 'AWS' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action' }
            ]
        },
        {
            generatedDateFormat: 'Sep 17 2019',
            generatedTimestamp: '07:13:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 7,
            ruleInfo: {
                ruleId: 1,
                title: "Vulnerability Alert"
            },
            description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP',
            threatCategories: [
                { title: 'Kill Chain', value: 'Vulnerability Alert' },
                { title: 'Sub Category', value: 'Vulnerability Alert' },
                { title: 'Threat Category', value: 'Vulnerability Alert' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'AWS-DomainEC2-Instance07, 18.10.9.1' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '36' },
                { title: 'Resource', value: 'Qualys' },
                { title: 'Indicators', value: 'SourceIP, Signature' }
            ]
        },

    ];

    ip_18_10_8_1_data = [
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
            additionalInfo: [
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
            additionalInfo: [
                { title: 'Affected Entity', value: '18.10.8.1' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '93' },
                { title: 'Resources', value: 'Firewall' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action, DestinationPort' },
                { title: 'IOC Reputation', value: 'TOR IP / Malicious IP' }],
            description: 'This Policy is triggered when traffic observed towards a nonstandard port'
        },
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
            additionalInfo: [
                { title: 'Affected Entity', value: '18.10.8.1' },
                { title: 'Locations', value: 'San Diego' },
                { title: 'Risk', value: '65' },
                { title: 'Resources', value: 'Firewall' },
                { title: 'Indicators', value: 'Event, SourceIP, DestinationIP, SrcHost, Action' },
                { title: 'IOC Reputation', value: 'TOR IP / Malicious IP' }],
            description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP Kill Chain: Reconnaissance'
        }
    ];

    activities = [
        { image: 'falg@1x.png', value: '9.8K', title: 'Events' },
        { image: 'resources@1x.png', value: '09', title: 'Resources' },
        { image: 'Shape@1x.png', value: '01', title: 'Locations' },
        { image: 'violations@1x.png', value: '05', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ];

    /* activitiesForAdmADittmer = [
        { image: 'falg@1x.png', value: '1.4K', title: 'Events' },
        { image: 'resources@1x.png', value: '04', title: 'Applications' },
        { image: 'Shape@1x.png', value: '01', title: 'Locations' },
        { image: 'violations@1x.png', value: '04', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ]; */

    activitiesForAdmScottEdwin = [
        { image: 'falg@1x.png', value: '1.1K', title: 'Events' },
        { image: 'resources@1x.png', value: '01', title: 'Applications' },
        { image: 'Shape@1x.png', value: '01', title: 'Locations' },
        { image: 'violations@1x.png', value: '03', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ];

    activitiesForHeidy = [
        { image: 'falg@1x.png', value: '1.9K', title: 'Events' },
        { image: 'resources@1x.png', value: '03', title: 'Applications' },
        { image: 'Shape@1x.png', value: '02', title: 'Locations' },
        { image: 'violations@1x.png', value: '02', title: 'Insights' },
        { image: 'incident@1x.png', value: '01', title: 'Incidents' },
    ]

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router, private topDetailsService: TopDetailsService) {
        window.scrollTo(0, 0);
        this.offset = 0;
        this.recordsReturned = 0;
        this.selectedDateRange = '1 Week';
    }

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedUser = params.get('selectedUser');

            this.selectedUserInfo = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
            this.selectedUserInfo.forEach(res => {

                if (res.value == this.selectedUser) {
                    this.userData = res;
                }
            });

            if (this.selectedUser == 'Alysa') {
                this.hardCodeItemData = this.flightUserHardCodeItemData;
            } else if (this.selectedUser === 'Maile') {
                this.hardCodeItemDataForDemoForEmoor = this.policyViolationForMaile;
            } else if (this.selectedUser === 'Mendelson') {
                this.hardCodeItemDataForDemoForMendelson = this.policyViolationForMendelson;
            } else if (this.selectedUser === 'Scott_Edwin') {
                this.difDateViolations = this.difDateVio_ScottEdwin;
            }

            if (this.selectedUser) {
                const dotIndex = this.selectedUser.indexOf('.');
                const isResource = dotIndex !== -1;
                const selectedUserData = this.riskyUserService.getSelectedUserData(this.selectedUser, isResource);
                const selectedUserDataFromModel = this.riskyUserService.getSelectedUserDataFromModel(this.selectedUser, isResource);
                forkJoin([selectedUserData, selectedUserDataFromModel]).subscribe((results: any) => {
                    const userData = results[0],
                        userDataFromModel = results[1];
                    this.selectedUserDetails.userInfo = userData.userInfo && userData.userInfo[0] || {};
                    this.selectedUserDetails.totalScore = userData.totalScore && userData.totalScore.total_riskscore || 0;
                    /* this.selectedUserDetails.data = [];
    
                    let data = userData && userData.data,
                        len = data && data.length, date;
    
                    let j = 1;
                    for (let i = 0; i < len; i++) {
                        const item = data[i];
                        date = moment(item.isotimestamp);
                        let pv = 'PV000';
                        const info = {
                            generatedTimestamp: date.utc().format('HH:mm:ss a'), // item.isotimestamp
                            riskScore: item.riskscore,
                            ruleInfo: item.ruleInfo[0],
                            userId: item.userid,
                            isotimestamp: item.isotimestamp,
                            accord: false,
                            pv: pv + j
                        };
                        this.selectedUserDetails.data.push(info);
                        j++;
                    }
    
                    if (userDataFromModel.totalScore && userDataFromModel.totalScore.total_riskscore) {
                        this.selectedUserDetails.totalScore = userDataFromModel.totalScore.total_riskscore + this.selectedUserDetails.totalScore;
                    }
                    data = userDataFromModel && userDataFromModel.data;
                    len = data && data.length;
                    for (let i = 0; i < len; i++) {
                        const item = data[i];
                        const info = {
                            generatedTimestamp: moment(item.isotimestamp).utc().format('HH:mm:ss a'), //moment(item.isotimestamp, 'YYYYMMDD'),
                            riskScore: item.riskscore,
                            ruleInfo: item.ruleInfo[0]
                        };
                        this.selectedUserDetails.data.push(info);
                    } */
                });
                /*this.riskyUserService.getSelectedUserData(this.selectedUser, isResource).subscribe((res: any) => {
                    const data = res.data,
                        len = data.length;
                    this.selectedUserDetails.userInfo = res.userInfo && res.userInfo[0] || {};
                    this.selectedUserDetails.data = [];
                    for (let i = 0; i < len; i++) {
                        const item = data[i];
                        const info = {
                            generatedTimestamp: item.isotimestamp, //moment(item.isotimestamp, 'YYYYMMDD'),
                            riskScore: item.riskscore,
                            ruleInfo: item.ruleInfo[0]
                        };
                        this.selectedUserDetails.data.push(info);
                    }
                });*/
                /*this.riskyUserService.getSelectedUserDataFromModel(this.selectedUser, isResource).subscribe((res: any) => {
                    this.selectedUserDetails.userInfo = res.userInfo && res.userInfo[0] || {};
                    this.selectedUserDetails.data = [];
                    const data = res && res.data,
                        len = data && data.length;
                    for (let i = 0; i < len; i++) {
                        const item = data[i];
                        const info = {
                            generatedTimestamp: item.isotimestamp, //moment(item.isotimestamp, 'YYYYMMDD'),
                            riskScore: item.riskscore,
                            ruleInfo: item.ruleInfo[0]
                        };
                        this.selectedUserDetails.data.push(info);
                    }
                });*/
            } else {
                this.getAllUsers();
            }
        });

        if (this.router.url.includes('riskyIncident')) {
            this.routeParam.paramMap.subscribe(params => {
                const incident = params.get('incident');
                this.incidentName = incident;

                if (incident == 'INC 38' || incident == 'TVDE38')
                    this.incidentViolations = this.admEmoorHardCodeItemData;
                else if (incident == 'INC 44' || incident == 'TVDE43')
                    this.incidentViolations = this.chen_ZhangHardCodeItemDate;
                else if (incident == 'INC 71' || incident == 'TVDE21')
                    this.incidentViolations = this.ipHardCodeItemData;
                else if (incident == 'INC 92' || incident == 'TVAC92') {
                    this.incidentAwender = true;
                    this.incidentViolations = this.hardCodeItemDataForDemo1;
                } else if (incident == 'INC 4' || incident == 'TVRC4') {
                    this.glenRobertoHardCodeItemData = null;
                    this.incidentViolations = this.glenRobertoHardCodeItemData;
                } else if (incident == 'TVDE23') {
                    this.difDateViolations = this.difDateVio_TVDE23;
                }

                this.incidentDetails.forEach(incidentDetail => {
                    if (incidentDetail.incident == incident) {
                        this.incidentDetail = incidentDetail;
                    }
                });
            })
        }
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

    seperatorStyle() {
        if (this.incidentName)
            return { 'background-color': 'unset', 'border-right': '3.5px dotted red' }
    }

    riskyDotStyle() {
        if (this.incidentName)
            return { 'background-color': 'red' }
    }

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
