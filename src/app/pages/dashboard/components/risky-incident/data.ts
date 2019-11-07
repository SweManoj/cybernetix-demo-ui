//=================== Risky Threat Vector DATA =======================
export var tvde23Data = [
  {
    violationDate: '14 Oct 2019',
    dottedLine: true,
    violations: [
      {
        generatedDateFormat: 'Oct 14 2019',
        generatedTimestamp: '21:03:00',
        accord: false,
        pv: 'IN 039',
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
        pv: 'IN 039',
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
  },
  {
    violationDate: '10 Oct 2019',
    dottedLine: true,
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
    dottedLine: true,
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
    dottedLine: true,
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
    dottedLine: true,
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
    dottedLine: true,
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
    dottedLine: false,
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
    dottedLine: false,
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
    dottedLine: false,
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

export var tvde38Data = [
  {
    violationDate: '13 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '10 May 2019',
        generatedTimestamp: '09:33:00',
        accord: false,
        pv: 'IN 093',
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
        pv: 'IN 061',
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
        pv: 'IN 39',
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
        pv: 'IN 041',
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
        pv: 'IN 069',
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
    ]
  }
];

export var tvde43Data = [
  {
    violationDate: '13 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '27 Sep 2019',
        generatedTimestamp: '10:13:00',
        accord: false,
        pv: 'IN 083',
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
        pv: 'IN 056',
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
        pv: 'IN 017',
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
        pv: 'IN 069',
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
        pv: 'IN 071',
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
      }
    ]
  }
];

export var tvde21Data = [
  {
    violationDate: '13 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: 'June 27 2019',
        generatedTimestamp: '12:45:00',
        accord: false,
        pv: 'IN 039',
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
        pv: 'IN 067',
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
        pv: 'IN 083',
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
        pv: 'IN 022',
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
    ]
  }
]

export var tvrc4Data = [
  {
    violationDate: '13 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: 'Oct 4 2019',
        generatedTimestamp: '03:50:00',
        accord: false,
        pv: 'IN 083',
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
        pv: 'IN 013',
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
        pv: 'IN 027',
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
        pv: 'IN 073',
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
    ]
  },
  {
    violationDate: '12 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: 'Sep 29 2019',
        generatedTimestamp: '13:07:00',
        accord: false,
        pv: 'IN 083',
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
        pv: 'IN 074',
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
        pv: 'IN 045',
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

    ]
  },
  {
    violationDate: '11 Sep 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: 'Sep 27 2019',
        generatedTimestamp: '10:30:00',
        accord: false,
        pv: 'IN 053',
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
        pv: 'IN 039',
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
        pv: 'IN 091',
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
    ]
  }
];

export var tvac92Data = [
  {
    violationDate: '13 June 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '13 June 2019',
        generatedTimestamp: '06:22:00',
        accord: false,
        pv: 'IN 092',
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
        pv: 'IN 059',
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
        pv: 'IN 041',
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
        pv: 'IN 021',
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
        pv: 'IN 033',
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
    ]
  },
  {
    violationDate: '12 June 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '12 June 2019',
        generatedTimestamp: '08:02:00',
        accord: false,
        pv: 'IN 043',
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
        pv: 'IN 088',
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
    ]
  },
  {
    violationDate: '11 June 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '11 June 2019',
        generatedTimestamp: '05:20:00',
        accord: false,
        pv: 'IN 073',
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
    ]
  },
  {
    violationDate: '10 June 2019',
    dottedLine: false,
    violations: [
      {
        generatedDateFormat: '10 June 2019',
        generatedTimestamp: '03:22:00',
        accord: false,
        pv: 'IN 023',
        riskScore: 83,
        ruleInfo: {
          ruleId: 1,
          title: 'Outbound Traffic to Spyware URL’s from Privileged User'
        },
        incId: 'INC-16',
        description: 'In this policy violation, User was trying to access URL(s) with Category: Malicious or Spyware',

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
    ]
  }
];

//=================== UNUSED Risky Threat Vector DATA =======================