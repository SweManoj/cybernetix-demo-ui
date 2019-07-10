import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'pie-chart',
    templateUrl: 'pieChart.component.html'
})
export class PieChartComponent implements OnInit {
    dummyTotalList = [1500, 100, 2000];
    dummyCountList = [10, 25, 20];
    dashboardCounts = [];
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        const defaultPieChart = this.dashboardService.defaultPieChart;
        this.dashboardService.getPieChartsSummary().subscribe((res: any) => {
            res.actions = 17;
            res.privilegedUserCount = 1125;
            res.serviceAccountsCount = 1153;
            this.dashboardCounts = res;

        });      
    }
}
