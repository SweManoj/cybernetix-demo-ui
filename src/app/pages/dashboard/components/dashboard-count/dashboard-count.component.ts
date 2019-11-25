import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { intToString } from '../../../../shared/utils/util-functions';

@Component({
  selector: 'app-dashboard-count',
  templateUrl: './dashboard-count.component.html'
})
export class DashboardCountComponent implements OnInit {

  loadingInProgress = true;
  dashboardCounts = [];
  intToString = intToString;

  violationCountsFirstHalf = [
    { title: 'Event Imported', image: 'logs@1x', value: 0, valueControl: 'eventImported' },
    { title: 'Users', image: 'users@2x', value: 0, valueControl: 'importedUserCount' },
    { title: 'IP Address', image: 'Ip@2x', value: 0, valueControl: 'importedIpAddressCount' },
    { title: 'Hosts', image: 'hostname@2x', value: 0, valueControl: 'importedHostCount' },
    { title: 'Privileged Accounts', image: 'previledged users@2x', value: 0, valueControl: 'privilegedUserCount' },
    { title: 'Service Accounts', image: 'service@2x', value: 0, valueControl: 'serviceAccountsCount' }];

  violationCountsSecondHalf = [
    { title: 'High Risky IPs', image: 'entities@1x', value: 0, valueControl: 'highRiskyIPCount' },
    { title: 'High Risky Users', image: 'risky@2x', value: 0, valueControl: 'highRiskyUserCount' },
    { title: 'High Risky Host', image: 'hostname@2x', value: 0, valueControl: 'highRiskyHostnameCount' },
    { title: 'Insights', image: 'violations@2x', value: 0, valueControl: 'policyViolation' },
    { title: 'Incidents', image: 'incident@2x', value: 0, valueControl: 'incidents' },
    { title: 'Actions', image: 'actions@1x', value: 0, valueControl: 'actions' },
  ]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboardCounts().subscribe((res: any) => {
      this.loadingInProgress = false;
      this.violationCountsFirstHalf.forEach(count => {
        count.value = res[count.valueControl]
      });
      this.violationCountsFirstHalf[0]['value'] = 69000000;

      this.violationCountsSecondHalf.forEach(count => {
        count.value = res[count.valueControl]
      })
    });
  }

}
