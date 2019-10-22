import { Component, OnInit, ViewChild } from '@angular/core';
import { Comment } from './comment';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

export interface User {
    name: string;
}

@Component({
    selector: 'app-policy-violation-summary',
    templateUrl: './incident-summary.component.html'
})
export class IncidentSummaryComponent implements OnInit {
    priority: any = '';
    status: any = '';
    outcome: any = '';
    isUpdate: boolean = false;
    selectedIncident: any;
    incidentDetails: any;
    myControl = new FormControl();
    options: User[] = [
        { name: 'Maile' },
        { name: 'Stella' },
        { name: 'Tino_Best' },
        { name: 'Coral' },
        { name: 'Shayla Simo' },
        { name: 'Martin J' },
        { name: 'Scott R' },
        { name: 'Steve D' }
    ];

    filteredOptions: Observable<User[]>;
    show = true;

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    d = new Date();

    incidents = [
        {
            description: 'Malicious Proxy Activities Followed By Geolocation Follwed By Fileshare Access Followed By Data Exfiltration',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'INC 92',
            viewCount: 1,
            policyViolationDate: '13 June 2019 06:22',
            incidentCreatedDate: '13 June 2019 11:45',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Closed',
            outcome: 'True Positive',
            caseOwner: 'Martin J',
            killChainProcess: [
                {
                    title: 'Malicious Behavior',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Account Compromise',
                    icon: 'delivery.png'
                },
                {
                    title: 'Geolocation',
                    icon: 'foothold.png'
                },
                {
                    title: 'Suspicious Behavior',
                    icon: 'monitor-code.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'connection.png'
                }
            ]
        },
        {
            description: 'Malicious Proxy Activities Followed By Geolocation Follwed By Fileshare Access Followed By Data Exfiltration',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'TVDE92',
            viewCount: 1,
            policyViolationDate: '13 June 2019 06:22',
            incidentCreatedDate: '13 June 2019 11:45',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Closed',
            outcome: 'True Positive',
            caseOwner: 'Martin J',
            killChainProcess: [
                {
                    title: 'Malicious Behavior',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Account Compromise',
                    icon: 'delivery.png'
                },
                {
                    title: 'Geolocation',
                    icon: 'foothold.png'
                },
                {
                    title: 'Suspicious Behavior',
                    icon: 'monitor-code.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'connection.png'
                }
            ]
        },
        {
            description: 'Privileged User escalated self-owned service account and used it for Data Exfiltration',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'INC 38',
            viewCount: 1,
            policyViolationDate: '23 Sep 2019 09:33',
            incidentCreatedDate: '23 Sep 2019 11:45',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Closed',
            outcome: 'True Positive',
            caseOwner: 'Martin J',
            killChainProcess: [
                {
                    title: 'Privilege Escalation',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Data Downloads',
                    icon: 'delivery.png'
                },
                {
                    title: 'Data Exfiltration Attempt',
                    icon: 'foothold.png'
                },
                {
                    title: 'Proxy Attempts',
                    icon: 'monitor-code.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'connection.png'
                }
            ]
        },
        {
            description: 'Privileged User escalated self-owned service account and used it for Data Exfiltration',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'TVDE38',
            viewCount: 1,
            policyViolationDate: '23 Sep 2019 09:33',
            incidentCreatedDate: '23 Sep 2019 11:45',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Closed',
            outcome: 'True Positive',
            caseOwner: 'Martin J',
            killChainProcess: [
                {
                    title: 'Privilege Escalation',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Data Downloads',
                    icon: 'delivery.png'
                },
                {
                    title: 'Data Exfiltration Attempt',
                    icon: 'foothold.png'
                },
                {
                    title: 'Proxy Attempts',
                    icon: 'monitor-code.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'connection.png'
                }
            ]
        },
        {
            description: 'Malicious Inbound traffic from External IP followed by outbound P2P traffic',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'INC 71',
            viewCount: 1,
            policyViolationDate: '27 June 2019 12:45',
            incidentCreatedDate: '27 June 2019 13:58',
            priority: 'Critical',
            indicatorsOfAttack: 4,
            status: 'Open',
            outcome: 'Investigation In Progress',
            caseOwner: 'Scott R',
            killChainProcess: [
                {
                    title: 'Port Scanning',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Inbound Telnet',
                    icon: 'delivery.png'
                },
                {
                    title: 'Inbound SMB',
                    icon: 'foothold.png'
                },
                {
                    title: 'P2P Traffic',
                    icon: 'monitor-code.png'
                }
            ]
        },
        {
            description: 'Malicious Inbound traffic from External IP followed by outbound P2P traffic',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'TVDE21',
            viewCount: 1,
            policyViolationDate: '27 June 2019 12:45',
            incidentCreatedDate: '27 June 2019 13:58',
            priority: 'Critical',
            indicatorsOfAttack: 4,
            status: 'Open',
            outcome: 'Investigation In Progress',
            caseOwner: 'Scott R',
            killChainProcess: [
                {
                    title: 'Port Scanning',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Inbound Telnet',
                    icon: 'delivery.png'
                },
                {
                    title: 'Inbound SMB',
                    icon: 'foothold.png'
                },
                {
                    title: 'P2P Traffic',
                    icon: 'monitor-code.png'
                }
            ]
        },
        {
            description: 'Privileged Activity Attempt followed by Account Compromise followed by Excessive Data Exfiltrtion',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'INC 44',
            viewCount: 1,
            policyViolationDate: '13 Oct 2019 10:13',
            incidentCreatedDate: '13 Oct 2019 10:49',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Open',
            outcome: 'Investigation In Progress',
            caseOwner: 'Steve D',
            killChainProcess: [
                {
                    title: 'Privileged Activity Attempt',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Account Compromise',
                    icon: 'delivery.png'
                },
                {
                    title: 'Dormant Activity',
                    icon: 'foothold.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'monitor-code.png'
                }
            ]
        },
        {
            description: 'Privileged Activity Attempt followed by Account Compromise followed by Excessive Data Exfiltrtion',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: null
            },
            incId: 'TVDE43',
            viewCount: 1,
            policyViolationDate: '13 Oct 2019 10:13',
            incidentCreatedDate: '13 Oct 2019 10:49',
            priority: 'Critical',
            indicatorsOfAttack: 5,
            status: 'Open',
            outcome: 'Investigation In Progress',
            caseOwner: 'Steve D',
            killChainProcess: [
                {
                    title: 'Privileged Activity Attempt',
                    icon: 'binary-search.png'
                },
                {
                    title: 'Account Compromise',
                    icon: 'delivery.png'
                },
                {
                    title: 'Dormant Activity',
                    icon: 'foothold.png'
                },
                {
                    title: 'Data Exfiltration',
                    icon: 'monitor-code.png'
                }
            ]
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
            },
            incId: 'INC-1',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_061',
            riskScore: 483,
            ruleInfo: {
                ruleId: 2,
                title: 'Successful Logon from Rare Machine - Windows'
            },
            incId: 'INC-2',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV_039',
            riskScore: 451,
            ruleInfo: {
                ruleId: 3,
                title: 'Unusual Data Exfiltration By Service Account - Proxy'
            },
            incId: 'INC-3',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            },
            incId: 'INC-4',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '14:45:00',
            accord: false,
            pv: 'PV 069',
            riskScore: 243,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Process Executed - Windows'
            },
            incId: 'INC-5',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
        {
            description: 'In this incident page, user was trying to access machine which is restricted to access by group policy',
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
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
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
            dummyDatas: [{ title: 'Affected Entity', value: 'AWendler' },
            { title: 'Locations', value: 'Berlin' },
            { title: 'Risk', value: '97' },
            { title: 'Resources', value: 'DLP' },
            { title: 'Indicators', value: 'URL, Attachment' }],
            description: 'In this Algorithm, User attempted to exfiltrate excessive data to Cloud via HTTPS',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Abnormal Pattern' },
                { title: 'Sub Category', value: 'Abnormal Pattern' }],
            description: 'In this Algorithm, Multiple Objects Accessed or Downloaded By User on Fileshare in short span',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Account Compromise' },
                { title: 'Sub Category', value: 'Account Compromise' }],
            description: 'In this Algorithm, Suspicious RDP to Multiple Hosts from Single Host as per historical baselining & Static Peer Grouping',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            description: 'In this Algorithm, Suspicious Remote Access Tools Usage By User as per historical baselining & Static Peer Grouping',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Account Compromise' },
                { title: 'Sub Category', value: 'Account Compromise' }],
            description: 'In this Algorithm, Successful Login Attempts on VPN from Unusual Location',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Account Compromise' },
                { title: 'Sub Category', value: 'Account Compromise' }],
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            description: 'In this Algorithm, VPN Activities from User after he/she has physical BadgeIN',
            threatCategories: [
                { title: 'Kill Chain', value: 'Actions/Maintain' },
                { title: 'Threat Category', value: 'Access Authentication' },
                { title: 'Sub Category', value: 'Bruce Force Attack' }],
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
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
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
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
            AffectedEntity: 'AWendler',
            Locations: 'Ukraine',
            Risk: 42,
            Resources: 'Proxy',
            Indicators: 'Category',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        },
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Privileged misuse' },
                { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            description: 'In this Algorithm, User Removed security enabled global group',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Export' }],
            description: 'In this Algorithm, user performed abnormal data export on MSQL database',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
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
            threatCategories: [
                { title: 'Kill Chain', value: '-' },
                { title: 'Threat Category', value: 'Privileged misuse' },
                { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            description: 'In this Algorithm, User Added security enabled global group',
            viewCount: 52,
            policyViolationDate: '10 May 2019 11:23:00',
            incidentCreatedDate: '09 Aug 2019 10:30:00',
            priority: '',
            indicatorsOfAttack: 5,
            status: '',
            outcome: '',
            caseOwner: ''
        }
    ];

    lastBoxStyles(first: boolean, last: boolean, incId: string) {
        const incidentValues: Array<String> = ['TVDE92', 'INC 92'];
        if (last && !incidentValues.includes(incId))
            return { 'color': 'white', 'background': 'red' };
        else if (first && incidentValues.includes(incId))
            return { 'color': 'white', 'background': 'red' };
        else
            return { 'color': 'black', 'background': '#099BB5' }
    }

    policyComments: Comment[] = [
        {
            userId: 'abhishek@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
                ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            timestamp: this.d.setHours(this.d.getHours() - 2),
            commentId: 1,
            parentId: 0,
            reply: false
        }, {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 4),
            commentId: 2,
            parentId: 0,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 5),
            commentId: 5,
            parentId: 2,
            reply: false
        }];

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

    killChainProcess = [
        {
            title: 'Initial Recon',
            icon: 'binary-search.png',
            isKill: 0
        },
        {
            title: 'Delivery',
            icon: 'delivery.png',
            isKill: 1
        },
        {
            title: 'Establish Foothold',
            icon: 'foothold.png',
            isKill: 1
        },
        {
            title: 'Initial Recon',
            icon: 'monitor-code.png',
            isKill: 1
        },
        {
            title: 'Move Literally',
            icon: 'connection.png',
            isKill: 0
        },
        {
            title: 'Complete Mission',
            icon: 'document-approval.png',
            isKill: 0
        }
    ];

    commentFormGroup: FormGroup;
    commentValue: AbstractControl;

    constructor(private formBuilder: FormBuilder, private routeParam: ActivatedRoute) {
        window.scrollTo(0, 0);
        this.initForm();
    }

    incidentDataChange() {
        if (this.priority != '' || this.status != '' || this.outcome != '' || this.myControl.value.name != null) {
            this.isUpdate = true;
        }
    }

    initForm() {
        this.commentFormGroup = this.formBuilder.group({
            commentValue: ['', Validators.compose([Validators.required])]
        });

        this.commentValue = this.commentFormGroup.controls['commentValue'];
    }

    submitComment() {
        console.log(this.commentValue.value);
        const comment = new Comment('abhishek@123', this.commentValue.value, new Date(), this.policyComments.length + 1);
        this.policyComments.unshift(comment);
        this.commentValue.setValue('');
    };

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIncident = params.get('incID');
            const incidentValues: Array<String> = ['INC 38', 'INC 71', 'INC 44', 'TVDE38', 'TVDE21', 'TVDE43', 'TVDE92', 'INC 92']
            if (incidentValues.includes(this.selectedIncident))
                this.show = false;
            this.incidents.forEach((incident) => {
                if (incident.incId === this.selectedIncident) {
                    this.incidentDetails = incident;
                    this.myControl.setValue({ name: incident.caseOwner });
                }
            });
        });

        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.options.slice())
            );
    }

    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
