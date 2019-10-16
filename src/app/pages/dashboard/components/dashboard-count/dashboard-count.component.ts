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

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboardCounts().subscribe((res: any) => {
      this.loadingInProgress = false;
      this.dashboardCounts = res;
    });
  }

}
