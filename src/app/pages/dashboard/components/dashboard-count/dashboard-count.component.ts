import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { intToString } from '../../../../shared/utils/util-functions';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-dashboard-count',
  templateUrl: './dashboard-count.component.html'
})
export class DashboardCountComponent implements OnInit {

  API_KEY: any;
  API_CIPHER: any;

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

  constructor(private dashboardService: DashboardService) {
    this.API_KEY = environment.API_KEY;
    this.API_CIPHER = environment.API_CIPHER;
  }

  ngOnInit() {
    this.dashboardService.getDashboardCounts().subscribe((res: any) => {
      res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));

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
