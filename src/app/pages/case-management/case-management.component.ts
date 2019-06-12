import { Component, OnInit, ViewChild } from '@angular/core';
import { RiskyUserService } from '../dashboard/components/riskyUsers/riskyUser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { CaseManagementService } from './case-management.service';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-management',
  templateUrl: './case-management.component.html'
})
export class CaseManagementComponent implements OnInit {

  @ViewChild('incident') incident: Table;
  selectedItems: any;
  selectedPolicyItems: any;
  allUsers: any = [];
  totalRecords: number = 0;
  recordsReturned: number = 0;
  private offset: number = 0;
  data = [
    { created: '03/01/2018', priority: 'Critical', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
    { created: '03/02/2018', priority: 'Medium', riskscore: 90, id: 'INC-21', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Pending', assignee: 'admin', alerts: 2 },
    { created: '03/03/2018', priority: 'High', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'user', alerts: 2 },
    { created: '03/04/2018', priority: 'Critical', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
    { created: '03/05/2018', priority: 'Low', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Completed', assignee: 'admin', alerts: 2 },
    { created: '03/06/2018', priority: 'Critical', riskscore: 90, id: 'INC-30', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'user', alerts: 2 },
    { created: '03/07/2018', priority: 'Critical', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Pending', assignee: 'NA', alerts: 2 },
    { created: '03/08/2018', priority: 'High', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
    { created: '03/09/2018', priority: 'Critical', riskscore: 90, id: 'INC-50', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Completed', assignee: 'admin', alerts: 2 },
    { created: '03/10/2018', priority: 'Low', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'NA', alerts: 2 },
    { created: '03/11/2018', priority: 'Critical', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
    { created: '03/12/2018', priority: 'High', riskscore: 90, id: 'INC-60', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
    { created: '03/13/2018', priority: 'Medium', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Completed', assignee: 'NA', alerts: 2 },
    { created: '03/14/2018', priority: 'Critical', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'user', alerts: 2 },
    { created: '03/15/2018', priority: 'Low', riskscore: 90, id: 'INC-20', name: 'High Risk Alert Reporting Engine for Cyber Sequrities', status: 'Task Requested', assignee: 'admin', alerts: 2 },
  ];

  shows = [];
  assignee = [{ name: 'Admin', value: 'admin' }, { name: 'User', value: 'user' }, { name: 'Not Assign', value: 'NA' }];
  status = [{ name: 'Task Requested', value: 'Task Requested' }, { name: 'Completed', value: 'Completed' }, { name: 'Pending', value: 'Pending' }];
  priority = [{ name: 'Critical', value: 'Critical' }, { name: 'Medium', value: 'Medium' }, { name: 'High', value: 'High' }, { name: 'Low', value: 'Low' }];

  @ViewChild('policy') policy: Table;
  myObjects = {
    'Monday 04/01/2019': [
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#1', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Tuesday 05/01/2019': [
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#2', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Wednesday 06/01/2019': [
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#3', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Thursday 07/01/2019': [
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#4', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Friday 08/01/2019': [
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#5', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Saturday 09/01/2019': [
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#6', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Sunday 10/01/2019': [
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#7', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Monday 11/01/2019': [
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#8', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Tuesday 12/01/2019': [
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#9', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Wednesday 13/01/2019': [
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#10', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Thursday 14/01/2019': [
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Medium' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'Low' },
      { srNo: '#11', time: '12:23:00Hrs', policyViolation: 'Virus Detected', entity: '192.168.0.102', indicator: '5', status: 'Unreviewed', priority: 'High' }
    ],
    'Friday 15/01/2019': [
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
  selectedIndex = 1;

  criticalItem = 0;
  mediumItem = 0;
  highItem = 0;
  lowItem = 0;

  constructor(private riskyUserService: RiskyUserService, private modalService: NgbModal, private caseManagmentService: CaseManagementService, private router: Router) {
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
  }

  ngOnInit() {
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
      debugger
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
      this.router.navigateByUrl('/policyViolationSummary');
    }
}
