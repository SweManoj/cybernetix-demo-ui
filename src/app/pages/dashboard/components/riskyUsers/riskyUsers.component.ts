import { AfterContentInit, Component, OnInit, NgZone } from '@angular/core';
import { RiskyUserService } from './riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import * as moment from 'moment';
import * as d3 from 'd3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from './riskyUsers-modal/riskyUsers-modal.component';
import { RiskyUserInfoModalComponent } from './risky-user-info-modal/risky-user-info-modal.component';
import { bubbleDataMonth } from './data';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import material from "@amcharts/amcharts4/themes/material";
import am4themes_dark from "@amcharts/amcharts4/themes/amchartsdark";
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { DatePipe } from '@angular/common';
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
    hardCodeItemDataForDemoForJohn1: any;
    hardCodeItemDataForDemoForJohn2: any;
    hardCodeItemDataForDemoForJohn3: any;
    hardCodeItemDataForDemoForEmoor: any;
     hardCodeItemDataForDemoForMendelson: any;
    userData: any;
    riskyObjects = [
        { type: 'user', value: 'ADittmer', score: 94, img: true, role: 'Sr. Tester', department: 'Quality Testing', location: 'Los Angles', reportingManager: 'Paul Smith', creationDate: '12 Dec 2018', lastWorkDay: '25 Jan 2019' },
        { type: 'user', value: 'Adm-EMoor', score: 87, img: true, role: 'AVP - Sales', department: 'Sales', location: 'San Diego', reportingManager: 'Ryan Smith', creationDate: '12 Jan 2016', lastWorkDay: '24 Apr 2019' },
        { type: 'user', value: 'Adm-ADittmer', score: 81, img: true, role: 'Sr. Software Engineer', department: 'Development', location: 'Banglore', reportingManager: 'Scott Henry', creationDate: '22 May 2017', lastWorkDay: '26 Feb 2019' },
        { type: 'user', value: 'AWendler', score: 97, img: true, role: 'Product Specialist', department: 'Product Development', location: 'Berlin', reportingManager: 'Peter Moore', creationDate: '13 Jun 2018', lastWorkDay: '9 Jul 2019' },
        { type: 'user', value: 'Svc-ROpitz', score: 54, img: true, role: 'Project Manager', department: 'Production', location: 'Paris', reportingManager: 'Alex Gee', creationDate: '23 Aug 2018', lastWorkDay: '24 May 2019' },
        { type: 'user', value: 'Alysa', score: 82, img: true, role: 'Project Manager', department: 'Production', location: 'Stuttgart', reportingManager: 'Rolf Dobelli', creationDate: '21 Nov 2017', lastWorkDay: '24 Apr 2019' },
        { type: 'user', value: 'Maile', score: 87, img: true, role: 'AVP - Sales', department: 'Sales', location: 'San Diego', reportingManager: 'Ryan Smith', creationDate: '12 Jan 2016', lastWorkDay: '24 Apr 2019' },
         { type: 'user', value: 'JohnS', score: 88, img: true, role: 'Contrator', department: 'Contractor', location: 'Seattle', reportingManager: 'George Bailey', creationDate: '12 Jan 2016', lastWorkDay: '24 Apr 2019' },
          { type: 'user', value: 'Mendelson', score: 87, img: true, role: 'Software Developer', department: 'ITSec', location: 'New Jersey', reportingManager: 'George Bailey', creationDate: '12 Jan 2016', lastWorkDay: '24 Apr 2019' }
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

    hardCodeItemData = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
            },
            incId : 'INC-1'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_061',
            riskScore: 483,
            ruleInfo: {
                ruleId: 2,
                title: 'Successful Logon from Rare Machine - Windows'
            },
            incId : 'INC-2'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV_039',
            riskScore: 451,
            ruleInfo: {
                ruleId: 3,
                title: 'Unusual Data Exfiltration By Service Account - Proxy'
            },
            incId : 'INC-3'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            },
            incId : 'INC-4'
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
            },
            incId : 'INC-5'
        },
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
            incId : 'INC-6'
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
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description : 'In this Algorithm, User Removed security enabled global group'
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
            incId : 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Export' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 81' },
            { title: 'Resources', value: 'MSQL' },
            { title: 'Indicators', value: 'Action/Tables' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
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
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 72/87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description : 'In this Algorithm, User Added security enabled global group'
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
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'New Jersey' },
            { title: 'Status', value: 'Risk: 87' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'AppNames' }],
            description : 'In this Algorithm, User Removed security enabled global group'
        },
         {
            generatedDateFormat: '29 July 2019',
            generatedTimestamp: '16:45:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Successful Logon from Rare Location'
            },
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'New Jersey' },
            { title: 'Status', value: 'Risk: 81' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Location' }],
            description : 'In this Algorithm, User Removed security enabled global group'
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
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Mendelson' },
            { title: 'Locations', value: 'New Jersey' },
            { title: 'Status', value: 'Risk: 74' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Event' }],
            description : 'In this Algorithm, User Removed security enabled global group'
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
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Exfiltration' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 87' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'Bytes, Category' }],
            description : 'In this Algorithm, User Removed security enabled global group'
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
            incId : 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 83' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
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
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 70' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
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
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'JohnS' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 67' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
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
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 70' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
        }
        
    ]

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
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Insider Threat' },
            { title: 'Sub Category', value: 'Insider Threat' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'Seattle' },
            { title: 'Status', value: 'Risk: 67' },
            { title: 'Resources', value: 'IIS' },
            { title: 'Indicators', value: 'Action' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
        }
    ]


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
            incId : 'INC-7',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Exfiltration' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Status', value: 'Risk: 97' },
            { title: 'Resources', value: 'DLP' },
            { title: 'Indicators', value: 'URL, Attachment' }],
            description : 'In this Algorithm, User attempted to exfiltrate excessive data to Cloud via HTTPS'
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
            incId : 'INC-8',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Abnormal Pattern' },
            { title: 'Sub Category', value: 'Abnormal Pattern' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Status', value: 'Risk: 91' },
            { title: 'Resources', value: 'Fileshare' },
            { title: 'Indicators', value: 'FileName' }],
            description : 'In this Algorithm, Multiple Objects Accessed or Downloaded By User on Fileshare in short span'
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
            incId : 'INC-9',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Status', value: 'Risk: 87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'EventID' }],
            description : 'In this Algorithm, Suspicious RDP to Multiple Hosts from Single Host as per historical baselining & Static Peer Grouping'
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
            incId : 'INC-11',
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Suspicious Behavior' },
                { title: 'Sub Category', value: 'Suspicious Behavior' }
            ],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Status', value: 'Risk: 84' },
            { title: 'Resources', value: 'Proxy' },
            { title: 'Indicators', value: 'Category' }],
            description : 'In this Algorithm, Suspicious Remote Access Tools Usage By User as per historical baselining & Static Peer Grouping'
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
            incId : 'INC-12',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Ukraine' },
            { title: 'Status', value: 'Risk: 75' },
            { title: 'Resources', value: 'VPN' },
            { title: 'Indicators', value: 'Location' }],
            description : 'In this Algorithm, Successful Login Attempts on VPN from Unusual Location'
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
            incId : 'INC-13',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Ukraine' },
            { title: 'Status', value: 'Risk: 75' },
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
            incId : 'INC-14',
            description: 'In this Algorithm, VPN Activities from User after he/she has physical BadgeIN',
            threatCategories:
                [{ title: 'Kill Chain', value: 'Actions/Maintain' },
                { title: 'Threat Category', value: 'Access Authentication' },
                { title: 'Sub Category', value: 'Bruce Force Attack' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin, Ukraine' },
            { title: 'Status', value: 'Risk: 74' },
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
            incId : 'INC-15',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Account Compromise' },
            { title: 'Sub Category', value: 'Account Compromise' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Ukraine' },
            { title: 'Status', value: 'Risk: 57' },
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
            incId : 'INC-16',
            Description: 'In this policy violation, User was trying to access URL(s) with Category: Malicious or Spyware',

            threatCategories: [
                { title: 'Kill Chain', 'value': '-' },
                { title: 'Threat Category', 'value': 'Malicious Behavior' },
                { title: 'SubCategory', 'value': 'Malicious Behavior' }
            ],
            AffectedEntity: 'AWendler',
            Locations: 'Ukraine',
            Risk: 42,
            Resources: 'Proxy',
            Indicators: 'Category'
        }
    ];

    flightUserHardCodeItemData = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '01:08:00',
            accord: false,
            pv: 'PV_051',
            riskScore: 479,
            ruleInfo: {
                ruleId: 1,
                title: 'Rare Appliations Accessed'
            },
            incId: 'INC-18'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '04:42:00',
            accord: false,
            pv: 'PV_072',
            riskScore: 479,
            ruleInfo: {
                ruleId: 1,
                title: 'High Amount of Documents Printed'
            },
            incId: 'INC-20'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '06:37:00',
            accord: false,
            pv: 'PV_062',
            riskScore: 523,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal Self Email to Personal Domains - DLP '
            },
            incId: 'INC-21'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '08:21:00',
            accord: false,
            pv: 'PV_047',
            riskScore: 291,
            ruleInfo: {
                ruleId: 3,
                title: 'Abnormal Visit to Job Sites'
            },
            incId: 'INC-22'
        }
    ];

    activities = [
        { image: 'falg@1x.png', value: '1.2K', title: 'Events' },
        { image: 'resources@1x.png', value: '09', title: 'Resources' },
        { image: 'Shape@1x.png', value: '02', title: 'Locations' },
        { image: 'violations@1x.png', value: '08', title: 'Violations' },
        { image: 'incident@1x.png', value: '02', title: 'Incidents' },
    ];

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router, private topDetailsService: TopDetailsService) {
        this.offset = 0;
        this.recordsReturned = 0;
        this.selectedDateRange = '1 Week';
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            // Initialize Guage meter chart
            this.initializeGuageMeterChart();

            // Initialize Bubble chart
            this.initializeBubbleChart();
        });
    }

    initializeGuageMeterChart() {

        am4core.useTheme(am4themes_animated);
        // create chart
        var chart = am4core.create("chartGuageDiv", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.innerRadius = -20;

        // Set cell size in pixels
        let cellSize = 30;
        chart.events.on("datavalidated", function (ev) {

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
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
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
        range0.axisFill.fill = am4core.color('greenyellow')
        range0.axisFill.zIndex = - 1;

        var range1 = axis.axisRanges.create();
        range1.value = 65;
        range1.endValue = 79;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color('darkorange')
        range1.axisFill.zIndex = -1;

        var range2 = axis.axisRanges.create();
        range2.value = 79;
        range2.endValue = 100;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color('crimson')
        range2.axisFill.zIndex = -1;

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = this.userData.score;
        hand.fill = am4core.color("#2D93AD");   // hand color
        hand.stroke = am4core.color("#2D93AD");

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

        var chart = am4core.create("bubbleChartdiv", am4charts.XYChart);

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.DateAxis());
        //xAxis.dataFields.category = "date";

        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        yAxis.dataFields.category = "hour";

        xAxis.dateFormats.setKey("day", "MMM dd, yyyy");
        xAxis.periodChangeDateFormats.setKey("day", "MMM dd, yyyy");

        xAxis.renderer.grid.template.disabled = false; // vertical line middle on the bubbles
        yAxis.renderer.grid.template.disabled = false; // Horizontal border line for the bubbles
        xAxis.renderer.axisFills.template.disabled = true; // vertical border - one by one column , not for all
        yAxis.renderer.axisFills.template.disabled = true; // horizontal border - one by one column , not for all
        yAxis.renderer.ticks.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;

        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "hour";
        series.dataFields.dateX = "date";
        series.dataFields.value = "value";
        series.columns.template.disabled = true; // background color for the columns
        series.sequencedInterpolation = true;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#2D93AD");
        series.defaultState.transitionDuration = 1000;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.tooltipText = "[bold, black]{policyViolated} : {value}";
        bullet.background.fill = am4core.color("black");
        bullet.strokeWidth = 2;
        bullet.stroke = am4core.color("#ffffff");
        bullet.propertyFields.fill = "color"; // provide dynamic color for bubbles
        bullet.strokeOpacity = 0;

        // tooltip rendering on the bubble
        bullet.adapter.add("tooltipY", (tooltipY, target) => {
            return 1; // -target.circle.radius + 1;
        })

        // size of the bubble increment
        series.heatRules.push({ property: "radius", target: bullet.circle, min: 6, max: 12 });

        bullet.hiddenState.properties.scale = 0.01;
        bullet.hiddenState.properties.opacity = 1;
        var hoverState = bullet.states.create("hover");
        hoverState.properties.strokeOpacity = 1;

        for (var x in bubbleDataMonth) {
            if (bubbleDataMonth[x].value > 0 && bubbleDataMonth[x].value <= 1)
                bubbleDataMonth[x].color = '#FFFF00';
            else if (bubbleDataMonth[x].value > 1 && bubbleDataMonth[x].value <= 3)
                bubbleDataMonth[x].color = '#FFA500';
            else if (bubbleDataMonth[x].value > 3)
                bubbleDataMonth[x].color = '#f00';
        }

        chart.data = bubbleDataMonth;

        // Add scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomXY";
    }

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedUser = params.get('selectedUser');

            this.selectedUserInfo = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
            this.selectedUserInfo.forEach(res => {

                if (res.value == this.selectedUser) {
                    this.userData = res;
                }
            })
            if (this.selectedUser == 'Alysa') {
                this.hardCodeItemData = this.flightUserHardCodeItemData;
            }

            if(this.selectedUser === 'Maile'){
             this.hardCodeItemDataForDemoForEmoor  = this.policyViolationForMaile;
            }

            if(this.selectedUser === 'JohnS'){
             this.hardCodeItemDataForDemoForJohn  = this.policyViolationForJohn;
            }

            if(this.selectedUser === 'Mendelson'){
             this.hardCodeItemDataForDemoForMendelson  = this.policyViolationForMendelson;
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
        window.open("#/policyViolationSummary", '_blank');
    }

    goToIncident() {
        window.open("#/incidentSummary", '_blank');
    }

    openUserInfo(userInfo: any) {
        const modalRef = this.modalService.open(RiskyUserInfoModalComponent, { size: 'lg' });
        modalRef.componentInstance.userInfo = userInfo;
    }

    changeChartDateRange(dateRange: string) {
        this.selectedDateRange = dateRange;
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65)
            return "greenyellow";
        else if (riskScore > 65 && riskScore <= 79)
            return "darkorange";
        else
            return "crimson";
    }
}
