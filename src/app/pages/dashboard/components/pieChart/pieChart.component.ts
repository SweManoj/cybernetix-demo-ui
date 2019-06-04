import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../dashboard.service';

@Component({
    selector: 'pie-chart',
    templateUrl: 'pieChart.component.html'
})
export class PieChartComponent implements OnInit {
    dummyTotalList = [1500, 100, 2000];
    dummyCountList = [10, 25, 20];
    pieChartList = [];
    pieChartList1 = [];
    pieChartList2 = [];
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
       /*  const defaultPieChart = this.dashboardService.defaultPieChart;
        this.dashboardService.getPieChartsSummary().subscribe((res: any) => {
            const results = res._results;
            for (let i = 0; i < results.length; i++) {
                let pieChart = results[i];
                pieChart = Object.assign({}, pieChart, defaultPieChart);
                pieChart.total = this.dummyTotalList[i];
                pieChart.count = this.dummyCountList[i];
                this.pieChartList.push(pieChart);
            }
            const IMSTickets = {
                title: 'IMS Tickets',
                count: 10,
                total: 20
            };
            this.pieChartList.push(Object.assign({}, IMSTickets, defaultPieChart));

        }); */

       this.pieChartList = this.dashboardService.getTopInfo();

       this.pieChartList1 = this.pieChartList.slice(0,6);
       this.pieChartList2 = this.pieChartList.slice(6,12);
    }
}
