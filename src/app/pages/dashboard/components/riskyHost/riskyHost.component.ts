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
        { type: 'host', value: 'PUNDESK001', score: 30, img: false, location: 'Munich, Germany', lastSeen: '23 Jun 2019 03:22:00', peer: 2, lastSeenUser: 'PAV58329' },
        { type: 'host', value: 'WK-1929304D', score: 93, img: false, location: 'San Diego', lastSeen: '14 Oct 2019 03:22:00', peer: 212, lastSeenUser: 'Chen_Zhang' },
        { type: 'host', value: 'USADESK25', score: 89, img: false, location: 'Amsterdam, Netherlands ', lastSeen: '21 Jun 2019 17:10:00', peer: 3, lastSeenUser: 'NEI89321' },
        { type: 'host', value: 'CHNLAP963', score: 66, img: false, location: 'Banglore, India', lastSeen: '22 Jun 2018 09:17:00', peer: 1, lastSeenUser: 'CAI67248' },
        { type: 'host', value: 'LONDESK588', score: 95, img: false, location: 'Beijing, China', lastSeen: '27 Jun 2019 13:09:00', peer: 2, lastSeenUser: 'SAU76518' },
        { type: 'host', value: 'AUSLAP4873', score: 90, img: false, location: 'Sydney, Australia', lastSeen: '14 Aug 2019 17:23:12', peer: 23, lastSeenUser: 'AndrewsStarc1' },
        { type: 'host', value: 'AWS-DomainEC2-Instance07', score: 92, img: false, location: 'San Diego', lastSeen: '7 Oct 2019 11:53:00', peer: 25, lastSeenUser: 'Glenn_Roberto' },
        { type: 'host', value: 'AWS-S3-Instance01', score: 98, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-10982', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-1456', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' },
        { type: 'host', value: 'DESK-1576', score: 95, img: false, location: 'San Diego', lastSeen: '-', peer: '-', lastSeenUser: '-' }
    ];

    provideData() {
        if (this.selectedHost == 'DESK-1576')
            this.hardCodeItemData = this.DESK_1576_data;
        else if (this.selectedHost == 'DESK-1456')
            this.hardCodeItemData = this.DESK_1456_data;
        else if (this.selectedHost == 'DESK-10982')
            this.hardCodeItemData = this.DESK_10982_data;
        else if (this.selectedHost == 'AWS-S3-Instance01')
            this.hardCodeItemData = this.AWS_S3_Instance01_data;
        else if (this.selectedHost == 'AWS-DomainEC2-Instance07')
            this.hardCodeItemData = this.AWS_DomainEC2_Instance07_data;
        else if (this.selectedHost == 'LONDESK588')
            this.hardCodeItemData = this.LONDESK588_data;
        else if (this.selectedHost == 'WK-1929304D')
            this.hardCodeItemData = this.WK_1929304D_data;
        else if (this.selectedHost == 'AUSLAP4873')
            this.hardCodeItemData = this.WK_1929304D_data;
    }

    DESK_1576_data = [
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '16:10:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Outbound traffic to non http/s ports (ftp,ssh,telnet)"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to non-standard ports',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'ESK-1576' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal amount of data exfltration in given time window"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) post activity is observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'ESK-1576' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal number of host connection to public IPs"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to public IPs',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Traffic towards public IPs' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'ESK-1576' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '16:00:10',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal traffic to public IP on SMB port"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) traffic towards SMB port observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-1576' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        }
    ]

    DESK_10982_data = [
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:10:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Outbound traffic to non http/s ports (ftp,ssh,telnet)"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to non-standard ports',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:10:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal traffic to public IP on SMB port"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) traffic towards SMB port observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal amount of data exfltration in given time window"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) post activity is observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal number of host connection to public IPs"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to public IPs',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Traffic towards public IPs' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '08:20:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Service creation from temp folder"
            },
            description: 'This violation is triggered when a service is triggered from temp floder probable implication of weaponization or malware presence',
            threatCategories: [
                { title: 'Kill Chain', value: 'Exploitation' },
                { title: 'Sub Category', value: 'Exploitation' },
                { title: 'Threat Category', value: 'Suspicious Service Installed' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982, SERV-1234, DESK-1456, DESK-1576, DESK-1877, DESK-1879' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Endpoint Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, ServiceName, folderPath' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '08:20:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Executables from non-standard system location"
            },
            description: 'This violation is triggered when an executable is run from non-standard system location, probable implication of weaponization or malware presence',
            threatCategories: [
                { title: 'Kill Chain', value: 'Exploitation' },
                { title: 'Sub Category', value: 'Exploitation' },
                { title: 'Threat Category', value: 'Suspicious Service Installed' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982, SERV-1234, DESK-1456, DESK-1576, DESK-1877, DESK-1879' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Endpoint Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, ServiceName, folderPath, fileName' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '08:20:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Use of windows command line utility"
            },
            description: 'This violation is triggered when command line utility is used, probable implication of weaponization or malware presence',
            threatCategories: [
                { title: 'Kill Chain', value: 'Exploitation' },
                { title: 'Sub Category', value: 'Exploitation' },
                { title: 'Threat Category', value: 'Suspicious Commands used' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982, SERV-1234, DESK-1456, DESK-1576, DESK-1877, DESK-1879' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Endpoint Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, ServiceName, folderPath, fileName' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '08:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Rare malware alert received - EDR"
            },
            description: 'This violation is triggered when a rare malware alert is triggered for a host in EDR',
            threatCategories: [
                { title: 'Kill Chain', value: 'Weaponization' },
                { title: 'Sub Category', value: 'Weaponization' },
                { title: 'Threat Category', value: 'Weaponization' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'FireEye Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, MalwareName' }
            ]
        },
        {
            generatedDateFormat: 'Oct 2 2019',
            generatedTimestamp: '08:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Suspicious service installed in system"
            },
            description: 'This violation is triggered when a suspicious service is installed in the end point probable implication of weaponization or malware presence. This also looks for similar services installed in other machines.',
            threatCategories: [
                { title: 'Kill Chain', value: 'Exploitation' },
                { title: 'Sub Category', value: 'Exploitation' },
                { title: 'Threat Category', value: 'Suspicious Service Installed' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-10982, SERV-1234, DESK-1456, DESK-1576, DESK-1877, DESK-1879' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Endpoint Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, ServiceName' }
            ]
        },

    ];

    DESK_1456_data = [
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal amount of data exfltration in given time window"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) post activity is observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-1456' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:00:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal number of host connection to public IPs"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to public IPs',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Traffic towards public IPs' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-1456' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:10:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Outbound traffic to non http/s ports (ftp,ssh,telnet)"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) number of connections are observed to non-standard ports',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-1456' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        },
        {
            generatedDateFormat: 'Oct 3 2019',
            generatedTimestamp: '16:10:00',
            accord: false,
            pv: 'TI 083',
            riskScore: 40,
            ruleInfo: {
                ruleId: 1,
                title: "Abnormal traffic to public IP on SMB port"
            },
            description: 'This violation is triggered when abnormal (spike, rare domain, unusual time, low & slow, patterns) traffic towards SMB port observed',
            threatCategories: [
                { title: 'Kill Chain', value: 'Data Exfiltration' },
                { title: 'Sub Category', value: 'Data Exfiltration' },
                { title: 'Threat Category', value: 'Data Exfiltration' }
            ],
            additionalInfo: [
                { title: 'Affected Entity', value: 'DESK-1456' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'Proxy Logs' },
                { title: 'Indicators', value: 'Event, SrcIP, Hostname, DestinationIP, DestinationPort, byteSent, domain' }
            ]
        }
    ]

    AUSLAP4873_data = [
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
            { title: 'Risk', value: '90' },
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
            { title: 'Risk', value: '82' },
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
            { title: 'Risk', value: '71' },
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
            { title: 'Risk', value: '53' },
            { title: 'Resources', value: 'Qualys' },
            { title: 'Indicators', value: 'Filenames' }],
            description: 'This violation is flagged when there are abnormal vulnerabilities found in the host as per baselining.'
        }
    ]

    LONDESK588_data = [
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

    AWS_DomainEC2_Instance07_data = [
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
                { title: 'Affected Entity', value: 'AWS-DomainEC2-Instance07' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '36' },
                { title: 'Resource', value: 'Qualys' },
                { title: 'Indicators', value: 'SourceIP, Signature' }
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
                { title: 'Affected Entity', value: 'AWS-DomainEC2-Instance07' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '83' },
                { title: 'Resource', value: 'AWS EC2 Logs' },
                { title: 'Indicators', value: 'Event, CommandExecuted' }
            ]
        }
    ];

    AWS_S3_Instance01_data = [
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
                { title: 'Affected Entity', value: 'AWS-S3-Instance01' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '85' },
                { title: 'Resource', value: 'AWS Access Logs' },
                { title: 'Indicators', value: 'Event, Accountname, SrcIP, DestinationIP, Count of Activities, CloudServer' }
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
                { title: 'Affected Entity', value: 'AWS-S3-Instance01' },
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
                { title: 'Affected Entity', value: 'AWS-S3-Instance01' },
                { title: 'Location', value: 'San Diego' },
                { title: 'Risk', value: '90' },
                { title: 'Resource', value: 'AWS Logs' },
                { title: 'Indicators', value: 'Event, CommandExecuted' }
            ]
        },
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
        }
    ];

    WK_1929304D_data = [
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

    getDataByHost() {
        this.hostAddressData.forEach(hostData => {
            if (hostData.value === this.selectedHost)
                this.hostDetails = hostData;
        });
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
        });

        this.getDataByHost();
        this.provideData();
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
