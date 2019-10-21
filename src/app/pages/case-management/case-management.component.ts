import { Component, OnInit, ViewChild } from '@angular/core';
import { RiskyUserService } from '../dashboard/components/riskyUsers/riskyUser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { CaseManagementService } from './case-management.service';
import { Table } from 'primeng/table';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { path } from 'd3';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html'
})
export class CaseManagementComponent implements OnInit {

  @ViewChild('incident') incident: Table;
  @ViewChild('threatVectorTable') threatVectorTable: Table;
  policyRangeDates: any;
  incidentRangeDates: any;
  selectedItems: any;
  selectedPolicyItems: any;
  allUsers: any = [];
  totalRecords: number = 0;
  recordsReturned: number = 0;
  private offset: number = 0;
  path: any;
  data = [
    { created: '23/09/2019', priority: 'Critical', riskscore: 90, id: 'INC 38', name: 'Privileged User escalated self-owned service account and used it for Data Exfiltration', status: 'Closed', assignee: 'Martin J', alerts: 2, entity: 'Adm-EMoor', type: 'user' },
    { created: '27/06/2018', priority: 'Critical', riskscore: 90, id: 'INC 71', name: 'Malicious Inbound traffic from External IP followed by outbound P2P traffic', status: 'Open', assignee: 'Scott R', alerts: 2, entity: '10.82.32.212', type: 'ip' },
    { created: '13/10/2018', priority: 'Critical', riskscore: 90, id: 'INC 44', name: 'Description: Privileged Activity Attempt followed by Account Compromise followed by Excessive Data Exfiltration', status: 'Open', assignee: 'Steve D', alerts: 2, entity: 'Chen_Zhang', type: 'user' },

    /* { created: '03/01/2018', priority: 'Critical', riskscore: 90, id: 'INC-1', name: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.101' },
    { created: '03/02/2018', priority: 'Medium', riskscore: 90, id: 'INC-2', name: 'Successful Logon from Rare Machine - Windows', status: 'Pending', assignee: 'admin', alerts: 2, entity: '192.168.0.102' },
    { created: '03/03/2018', priority: 'High', riskscore: 90, id: 'INC-3', name: 'Unusual Data Exfiltration By Service Account - Proxy', status: 'Task Requested', assignee: 'user', alerts: 2, entity: '192.168.0.106' },
    { created: '03/04/2018', priority: 'Critical', riskscore: 90, id: 'INC-4', name: 'Suspicious Data Objects Downloaded By Service Account - Fileshare', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.108' },
    { created: '03/05/2018', priority: 'Low', riskscore: 90, id: 'INC-5', name: 'Abnormal Process Executed - Windows', status: 'Completed', assignee: 'admin', alerts: 2, entity: '192.168.0.102' },
    { created: '03/06/2018', priority: 'Critical', riskscore: 90, id: 'INC-6', name: 'Multiple Users Logged-In Successfully From Same IP', status: 'Task Requested', assignee: 'user', alerts: 2, entity: '192.168.0.108' },
    { created: '03/07/2018', priority: 'Critical', riskscore: 90, id: 'INC-7', name: 'Data Exfiltration to Cloud via HTTPS', status: 'Pending', assignee: 'NA', alerts: 2, entity: '192.168.0.112' },
    { created: '03/08/2018', priority: 'High', riskscore: 90, id: 'INC-8', name: 'In this Algorithm, User attempted to exfiltrate excessive data to Cloud via HTTPS', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.153' },
    { created: '03/09/2018', priority: 'Critical', riskscore: 90, id: 'INC-9', name: 'Abnormal Objects Accessed on Fileshare', status: 'Completed', assignee: 'admin', alerts: 2, entity: '192.168.0.128' },
    { created: '03/10/2018', priority: 'Low', riskscore: 90, id: 'INC-10', name: 'Suspicious RDP to Multiple Hosts from Privileged User', status: 'Task Requested', assignee: 'NA', alerts: 2, entity: '192.168.0.157' },
    { created: '03/11/2018', priority: 'Critical', riskscore: 90, id: 'INC-11', name: 'Abnormal Remote Access Tools Usage', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.172' },
    { created: '03/12/2018', priority: 'High', riskscore: 90, id: 'INC-12', name: 'Successful Login From Unusual Location - VPN', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.112' },
    { created: '03/13/2018', priority: 'Medium', riskscore: 90, id: 'INC-13', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Completed', assignee: 'NA', alerts: 2, entity: '192.168.0.142' },
    { created: '03/14/2018', priority: 'Critical', riskscore: 90, id: 'INC-14', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'user', alerts: 2, entity: '192.168.0.102' },
    { created: '03/15/2018', priority: 'Low', riskscore: 90, id: 'INC-15', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2, entity: '192.168.0.109' }, */
  ];

  threatVectorData:Array<any> = [
    { detectedOn: '23/09/2019', threatVectorID: 'TVDE38', priority: 'Critical', id: 'INC 38', riskScore: '95', incident: 'YES', name: 'Privileged User escalated self-owned service account and used it for Data Exfiltration', status: 'Closed', assignee: 'Martin J', alerts: 2, entity: 'Adm-EMoor', type: 'Auto' },
    { detectedOn: '13/10/2018', threatVectorID: 'TVDE43', priority: 'Critical', id: 'INC 71', riskScore: '93', incident: 'YES', name: 'Malicious Inbound traffic from External IP followed by outbound P2P traffic', status: 'Open', assignee: 'Scott R', alerts: 2, entity: '10.82.32.212', type: 'Auto' },
    { detectedOn: '27/06/2018', threatVectorID: 'TVDE21', priority: 'Critical', id: 'INC 44', riskScore: '89', incident: 'YES', name: 'Description: Privileged Activity Attempt followed by Account Compromise followed by Excessive Data Exfiltration', status: 'Open', assignee: 'Steve D', alerts: 2, entity: 'Chen_Zhang', type: 'Auto' },
  ];

  redirectToTimeline(type, entity) {
    if (type == 'user')
      this.router.navigate(['/riskyUser', entity]);
    else if (type == 'ip')
      this.router.navigate(['/riskyIP', entity]);
  }

  shows = [{ name: 'Last 1 Day', value: '1day' }, { name: 'Last 2 Day', value: '2day' }, { name: 'Last 7 Day', value: '7day' }, { name: 'Last 1 month', value: 'month' }];
  assignee = [{ name: 'Admin', value: 'admin' }, { name: 'User', value: 'user' }, { name: 'Not Assign', value: 'NA' }];
  status = [{ name: 'Task Requested', value: 'Task Requested' }, { name: 'Completed', value: 'Completed' }, { name: 'Pending', value: 'Pending' }];
  priority = [{ name: 'Critical', value: 'Critical' }, { name: 'Medium', value: 'Medium' }, { name: 'High', value: 'High' }, { name: 'Low', value: 'Low' }];

  @ViewChild('policy') policy: Table;
  myObjects = {
    'Monday 01/01/2019': [
      { srNo: 'PV_083', time: '12:23:00Hrs', policyViolation: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows', entity: '192.168.0.102', indicator: '1', status: 'Unreviewed', priority: 'High' },
      { srNo: 'PV_061', time: '12:23:00Hrs', policyViolation: 'Successful Logon from Rare Machine - Windows', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: 'PV_041', time: '12:23:00Hrs', policyViolation: 'Suspicious Data Objects Downloaded By Service Account - Fileshare', entity: '192.168.0.102', indicator: '3', status: 'Unreviewed', priority: 'Medium' },
      { srNo: 'PV_069', time: '12:23:00Hrs', policyViolation: 'Abnormal Process Executed - Windows', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: 'PV_094', time: '12:23:00Hrs', policyViolation: 'Multiple Users Logged-In Successfully From Same IP', entity: '192.168.0.102', indicator: '4', status: 'Unreviewed', priority: 'High' },
      { srNo: 'PV_092', time: '12:23:00Hrs', policyViolation: 'Data Exfiltration to Cloud via HTTPS', entity: '192.168.0.102', indicator: '7', status: 'Unreviewed', priority: 'Medium' },
      { srNo: 'PV_044', time: '12:23:00Hrs', policyViolation: 'Suspicious RDP to Multiple Hosts from Privileged User', entity: '192.168.0.102', indicator: '6', status: 'Unreviewed', priority: 'Low' },
      { srNo: 'PV_021', time: '12:23:00Hrs', policyViolation: 'Abnormal Remote Access Tools Usage', entity: '192.168.0.102', indicator: '6', status: 'Unreviewed', priority: 'Low' },
      { srNo: 'PV_033', time: '12:23:00Hrs', policyViolation: 'Successful Login From Unusual Location - VPN', entity: '192.168.0.102', indicator: '6', status: 'Unreviewed', priority: 'Low' },
      { srNo: 'PV_043', time: '12:23:00Hrs', policyViolation: 'Multiple Failed Login Attempts From Unusual Location - VPN', entity: '192.168.0.102', indicator: '6', status: 'Unreviewed', priority: 'Low' },
      { srNo: 'PV_088', time: '12:23:00Hrs', policyViolation: 'Abnormal VPN Activities after BadgeIN', entity: '192.168.0.102', indicator: '6', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Tuesday 02/01/2019': [
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Wednesday 03/01/2019': [
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Thursday 04/01/2019': [
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Friday 05/01/2019': [
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Saturday 06/01/2019': [
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Sunday 07/01/2019': [
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Monday 08/01/2019': [
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Tuesday 09/01/2019': [
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Wednesday 10/01/2019': [
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Thursday 11/01/2019': [
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Friday 12/01/2019': [
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#12', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ]
  };

  @ViewChild('day') day: Table;
  myDays: string[] = [];
  myPolicies: any[] = [];
  selectedIndex = 0;

  criticalItem = 0;
  mediumItem = 0;
  highItem = 0;
  lowItem = 0;
  totalItem = 0;

  constructor(private riskyUserService: RiskyUserService, private modalService: NgbModal, private caseManagmentService: CaseManagementService,
    private router: Router, private route: ActivatedRoute,
  ) {
    window.scrollTo(0, 0);
    this.offset = 0;
    this.recordsReturned = 0;

    // Use `key` and `value` - read key value pairs from an object
    for (let key in this.myObjects)
      this.myDays.push(key);

    if (this.myDays[0]) {
      this.myPolicies = this.myObjects[this.myDays[0]];
      this.getStageValues();
    }
  }

  getStageValues() {
    this.criticalItem = this.myPolicies.filter(myPolicy => myPolicy.priority == 'Critical').length;
    this.mediumItem = this.myPolicies.filter(myPolicy => myPolicy.priority == 'Medium').length;
    this.highItem = this.myPolicies.filter(myPolicy => myPolicy.priority == 'High').length;
    this.lowItem = this.myPolicies.filter(myPolicy => myPolicy.priority == 'Low').length;
    this.totalItem = this.criticalItem + this.mediumItem + this.lowItem + this.highItem;
  }

  threatVectorTitle: string;
  ngOnInit() {

    // Current Path:  company 
    this.route.url.subscribe(url => {
      this.path = (url[0].path);
    });

    if (this.router.url.includes('threatVectorManagement')) {
      this.route.paramMap.subscribe((params) => {
        this.threatVectorTitle = params.get('threatVector');
      });
    }

    this.getAllUsers();
  }

  daySelected(rowIndex: number) {
    this.selectedIndex = rowIndex;
    this.myPolicies = this.myObjects[this.myDays[rowIndex]];
    this.getStageValues();
  }

  onPolicyRowSelect(event: any) {
  }

  onPolicyRowUnselect(event: any) {
  }

  getAllUsers() {
    // this.riskyUserService.getUploadExceedData(this.offset).subscribe((res: any) => {
    //     this.totalRecords = res._totalRecords;
    //     this.allUsers = this.allUsers.concat(res.data);
    //     this.allUsers.sort((a, b) => {
    //         return b.riskscore - a.riskscore;
    //     });
    //     this.recordsReturned = this.allUsers.length;
    // });

    this.caseManagmentService.getAllCases().subscribe((res: any) => {
      //debugger
      this.allUsers = res.data;
      console.log(res)
    });
  }

  loadMoreUsers() {
    this.offset++;
    this.getAllUsers();
  }

  onActionClick(name, data) {
    const modalRef = this.modalService.open(CaseModalComponent);
    modalRef.componentInstance.name = name;
    modalRef.componentInstance.data = data;
  }

  onRowSelect(event) {
  }

  onRowUnselect(event) {
  }

  selectIncidentClick(event) {
    event ? this.incident.filter('NA', 'assignee', 'contains') : this.incident.filter('', 'assignee', 'contains'); // value, field, matchMode
  }

  selectPolicyClick(event) {
    event ? this.policy.filter('High', 'priority', 'contains') : this.policy.filter('', 'priority', 'contains'); // value, field, matchMode
  }

  goToPolicyViolationSummaryPage() {
    window.open("#/policyViolationSummary", '_blank');
    //this.router.navigate([]).then(result => {  window.open("#/policyViolationSummary", '_blank'); });
    //this.router.navigateByUrl('/policyViolationSummary');
  }

  goToIncidentSummaryPage() {
    window.open("#/incidentSummary", '_blank');
    //this.router.navigate([]).then(result => {  window.open("#/incidentSummary", '_blank'); });
    //this.router.navigateByUrl('/incidentSummary');
  }
}
