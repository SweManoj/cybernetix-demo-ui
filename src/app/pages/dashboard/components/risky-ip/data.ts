export var ip_10_82_71_192_data = [
    {
        violationDate: '10 Oct 2019',
        violations: [
            {
                generatedTimestamp: '17:23:00',
                accord: false,
                pv: 'PV 039',
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
                pv: 'PV 039',
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
                pv: 'PV 039',
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
                pv: 'PV 039',
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
    }
];

export var ip_10_82_32_212_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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
                    { title: 'Sub Category', value: 'P2P Traffic' }],
                additionalInfo: [
                    { title: 'Affected Entity', value: '10.82.32.227' },
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
                threatCategories: [
                    { title: 'Last Hostname', value: 'WK-UKL48503D' },
                    { title: 'Last IP', value: '10.82.32.212' }],
                additionalInfo: [
                    { title: 'New Hostname', value: 'WK-UKL48503D' },
                    { title: 'New IP', value: '10.82.32.227' }],
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
                    { title: 'Sub Category', value: 'Inbound SMB' }],
                additionalInfo: [
                    { title: 'Affected Entity', value: '10.82.32.212' },
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
                threatCategories: [
                    { title: 'Kill Chain', value: 'Reconnaissance' },
                    { title: 'Threat Category', value: 'Malicious Behavior' },
                    { title: 'Sub Category', value: 'Inbound Telnet' }],
                additionalInfo: [
                    { title: 'Affected Entity', value: '10.82.32.212' },
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
                threatCategories: [
                    { title: 'Kill Chain', value: 'Reconnaissance' },
                    { title: 'Threat Category', value: 'Port Scanning' },
                    { title: 'Sub Category', value: 'Inbound Attack' }],
                additionalInfo: [
                    { title: 'Affected Entity', value: '10.82.32.212' },
                    { title: 'Locations', value: 'Indonesia' },
                    { title: 'Risk', value: '54' },
                    { title: 'Resources', value: 'Netflow' },
                    { title: 'Indicators', value: 'SrcIP, DstIP, DstPort' }],
                description: 'This Violation is triggered when Port Scanning operation is detected from External IP'
            }
        ]
    }
];

export var ip_10_82_69_151_data = [
    {
        violationDate: '14 Oct 2019',
        violations: [
            {
                generatedDateFormat: 'Oct 14 2019',
                generatedTimestamp: '21:03:00',
                accord: false,
                pv: 'PV 039',
                riskScore: 17,
                ruleInfo: {
                    ruleId: 17,
                    title: 'Potential Data Exfiltration to External IP'
                },
                threatCategories: [
                    { title: 'Kill Chain', value: 'Data Exfiltration' },
                    { title: 'Threat Category', value: 'Data Exfiltration' },
                    { title: 'Sub Category', value: 'Data Exfiltration' }],
                additionalInfo: [
                    { title: 'SourceIP', value: '10.82.71.192' },
                    { title: 'DestinationIP', value: '195.208.113.97' },
                    { title: 'DestinationPort', value: '21' },
                    { title: 'Packet Size', value: '10.3MB' },
                    { title: 'Location', value: 'Russia' },
                    { title: 'Risk', value: '94' },
                    { title: 'Packets', value: '18' },
                    { title: 'Resources', value: 'NetFlow' },
                    { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                description: 'This anomaly is flagged when there is Unusual beaconing with External IP'
            },
            {
                generatedTimestamp: '17:23:00',
                accord: false,
                pv: 'PV 039',
                riskScore: 19,
                ruleInfo: {
                    ruleId: 19,
                    title: 'Potential Data Exfiltration to External IP'
                },
                threatCategories: [
                    { title: 'Kill Chain', value: 'Data Exfiltration' },
                    { title: 'Threat Category', value: 'Data Exfiltration' },
                    { title: 'Sub Category', value: 'Data Exfiltration' }],
                additionalInfo: [
                    { title: 'SourceIP', value: '10.82.69.151' },
                    { title: 'DestinationIP', value: '195.208.113.97' },
                    { title: 'DestinationPort', value: '21' },
                    { title: 'Packet Size', value: '10.3MB' },
                    { title: 'Location', value: 'Russia' },
                    { title: 'Risk', value: '91' },
                    { title: 'Resources', value: 'NetFlow' },
                    { title: 'Indicators', value: 'SourceIP, DestinationIP, DestinationPort, Service' }],
                description: 'This anomaly is flagged when there is Unusual Communication with Rare Port/IP'
            }
        ]
    }
];

export var ip_18_10_8_1_data = [
    {
        violationDate: '14 Oct 2019',
        violations: [
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
            }
        ]
    }
];

export var ip_10_82_34_107_data = [
    {
        violationDate: '05 Oct 2019',
        violations: [
            {
                generatedDateFormat: 'Oct 5 2019',
                generatedTimestamp: '08:50:00',
                accord: false,
                pv: 'PV 039',
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
                pv: 'PV 039',
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
        violationDate: '30 Sep 2019',
        violations: [
            {
                generatedDateFormat: '1 Oct 2019',
                generatedTimestamp: '07:37:00',
                accord: false,
                pv: 'IN 035',
                riskScore: 74,
                ruleInfo: {
                    ruleId: 74,
                    title: 'Potential Password Spray Attack'
                },
                incId: 'IN 091',
                threatCategories: [
                    { title: 'Kill Chain', value: 'Reconnaissance' },
                    { title: 'Threat Category', value: 'Password Spray' },
                    { title: 'Sub Category', value: 'Password Spray' }],
                additionalInfo: [
                    { title: 'Affected Entity', value: '10.82.34.107' },
                    { title: 'EventDescription', value: 'Login Failed' },
                    { title: 'Combinations', value: '74' },
                    { title: 'Risk', value: '81' },
                    { title: 'Resource', value: 'Web Application' },
                    { title: 'Indicators', value: 'Accountname, EventDescription, SourceIP' }],
                description: 'This anomaly is flagged when abnormal number of failed logon attempts using different combinations of usernames/passwords'
            }
        ]
    }
];

// ===================== UNUSED IP DATA ============================

var ip_10_82_34_101_data = [
    {
        generatedDateFormat: 'Oct 1 2019',
        generatedTimestamp: '10:50:00',
        accord: false,
        pv: 'PV 039',
        riskScore: 35,
        ruleInfo: {
            ruleId: 3,
            title: 'Network scanning activities identified from an internal IP'
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Recon' },
            { title: 'Threat Category', value: 'Internal Network Scan' },
            { title: 'Sub Category', value: 'Internal Network Scan' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '10.82.34.101 DESK-10982, 10.82.34.109, 10.82.34.102, 10.82.34.104, 10.82.34.111, 192.168.200.55' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'NetFlow' },
            { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
        description: 'This anomaly is flagged when there is potential network scanning activity observed from internal IP'
    },
    {
        generatedDateFormat: 'Oct 1 2019',
        generatedTimestamp: '10:55:00',
        accord: false,
        pv: 'PV 039',
        riskScore: 35,
        ruleInfo: {
            ruleId: 3,
            title: 'Network traffic towards rare machines'
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Lateral Movement' },
            { title: 'Threat Category', value: 'Lateral Movement' },
            { title: 'Sub Category', value: 'Compromise of internal hosts' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '10.82.34.101 DESK-10982, 192.168.200.57 SERV-1234, 10.67.122.136 DESK-1456, 10.67.122.132 VSERV-6743' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'Windows, NetFlow' },
            { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
        description: 'This anomaly is flagged when an internal IP communicates with another IP which is a rare connectivity'
    },
    {
        generatedDateFormat: 'Oct 1 2019',
        generatedTimestamp: '11:00:00',
        accord: false,
        pv: 'PV 039',
        riskScore: 35,
        ruleInfo: {
            ruleId: 3,
            title: 'Single IP communicating to multiple IPs'
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Lateral Movement' },
            { title: 'Threat Category', value: 'Lateral Movement' },
            { title: 'Sub Category', value: 'Compromise of internal hosts' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '10.82.34.101 DESK-10982, 10.82.34.109 DESK-1876, 10.82.34.102 DESK-1879, 10.82.34.104 DESK-1877, 10.82.34.111 DESK-1676, 192.168.200.55 DESK-1576, 92.168.200.57 SERV-1234, 10.67.122.136 DESK-1456, 10.67.122.132 VSERV-6743' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'Windows, NetFlow' },
            { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
        description: 'This anomaly is flagged when one internal IP communicates with multiple other IPs in the network which can indicate probable lateral movement'
    },
    {
        generatedDateFormat: 'Oct 1 2019',
        generatedTimestamp: '11:00:00',
        accord: false,
        pv: 'PV 039',
        riskScore: 35,
        ruleInfo: {
            ruleId: 3,
            title: 'Potential Lateral Movement activity observed'
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Lateral Movement' },
            { title: 'Threat Category', value: 'Lateral Movement' },
            { title: 'Sub Category', value: 'Compromise of internal hosts' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '10.82.34.101 DESK-10982, 10.82.34.109 DESK-1876, 10.82.34.102 DESK-1879, 10.82.34.104 DESK-1877, 10.82.34.111 DESK-1676, 192.168.200.55 DESK-1576, 92.168.200.57 SERV-1234, 10.67.122.136 DESK-1456, 10.67.122.132 VSERV-6743' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'Windows, NetFlow' },
            { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
        description: 'This anomaly is flagged when one internal IP communicates with multiple other IPs in the network which can indicate probable lateral movement'
    }
];

var ip_172_168_200_55_data = [
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
        additionalInfo: [
            { title: 'Affected Entity', value: '172.168.200.55, 10.82.34.101, 10.82.34.102, 10.82.34.104, 10.82.34.111, 192.168.200.55, 192.168.200.57, 10.67.122.136, 10.67.122.132' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Risk', value: '85' },
            { title: 'Resources', value: 'Windows, NetFlow' },
            { title: 'Indicators', value: 'Event, Accountname, LogonType, Result, SourceIP, DestinationIP, DestinationPort, Hostname' }],
        description: 'This anomaly is triggered when abnormal behaviour seen from Malicious External IP Kill Chain: Reconnaissance'
    }
];

var hardCodeItemData = [
    {
        generatedDateFormat: '10 May 2019',
        generatedTimestamp: '03:22:00',
        accord: false,
        pv: 'PV 083',
        riskScore: 579,
        ruleInfo: {
            ruleId: 1,
            title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
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
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
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
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
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
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
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
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
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
        },
        threatCategories: [
            { title: 'Kill Chain', value: 'Actions/Maintain' },
            { title: 'Threat Category', value: 'Access Authentication' },
            { title: 'Sub Category', value: 'Bruce Force Attack' }],
        additionalInfo: [
            { title: 'Affected Entity', value: '-' },
            { title: 'Locations', value: '-' },
            { title: 'Risk', value: '-' },
            { title: 'Resources', value: '-' },
            { title: 'Indicators', value: '-' }],
        description: 'In this policy violation, user was trying to access machine which is restricted to access by group policy'
    }
];

