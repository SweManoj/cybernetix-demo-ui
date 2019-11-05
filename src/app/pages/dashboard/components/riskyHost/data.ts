export var AWS_S3_Instance01_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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
        ]
    }
];

export var DESK_10982_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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

        ]
    }
];

export var DESK_1456_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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
    }
];

export var DESK_1576_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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
    }
];

export var WK_1929304D_data = [
    {
        violationDate: '27 June 2019',
        violations: [
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
        ]
    }
]