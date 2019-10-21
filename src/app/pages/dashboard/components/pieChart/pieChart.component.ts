import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';
import { ShortNumberPipe } from '../../../../shared/pipes/filters/filter.pipe';

@Component({
    selector: 'pie-chart',
    templateUrl: 'pieChart.component.html'
})
export class PieChartComponent implements OnInit {
    dummyTotalList = [1500, 100, 2000];
    dummyCountList = [10, 25, 20];
    dashboardCounts = [];

    pieChartValues = {
        eventImported: '2.8M',
        users: '24K',
        ipAddresses: '11K',
        hosts: '21K',
        priviledgeAccounts: '1.1K',
        serviceAccounts: '1.2K',
        highRiskyIps: '11',
        highRiskyUsers: '31',
        highRiskyHostnames: '16',
        insights: '41',
        incidents: '3',
        actions: '0'
    }
    
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        const defaultPieChart = this.dashboardService.defaultPieChart;
        this.dashboardService.getPieChartsSummary().subscribe((res: any) => {
            res.actions = 17;
            res.privilegedUserCount = 1125;
            res.serviceAccountsCount = 11530;
            this.dashboardCounts = res;

        });
    }
}
