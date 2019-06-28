import { Component, OnInit, NgZone, Input } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

am4core.useTheme(am4themes_animated);
@Component({
    selector: "globe-chart",
    templateUrl: "./globe-chart.component.html"
})
export class GlobeChartComponent implements OnInit {
    @Input() componentType: string;

    constructor(private zone: NgZone) { }

    public pieChartOptions: ChartOptions = {
        responsive: true,
        legend: {
            position: 'right',
            labels: {
                fontFamily: 'Calibri',
                fontSize: 12,
                fontColor: '#a0a0a0',
                fontStyle: 'bold',
                padding: 24,
            },

        },
        plugins: {
            datalabels: {
                formatter: (value, ctx) => {
                    const label = ctx.chart.data.labels[ctx.dataIndex];
                    return label;
                },
            },
        }
    };
    public pieChartLabels: Label[] = ['IT Security', 'Infrastructure', 'IT Support', 'Quality Testing', 'Development'];
    public pieChartData: number[] = [28, 15, 10, 12, 30];
    public pieChartType: ChartType = 'pie';
    public pieChartLegend = true;
    public pieChartColors = [
        {
            backgroundColor: ['#581845', '#ffc305', '#c70039', '#ff5733', '#900c3f'],
        },
    ];

    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            yAxes: [
                {
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        fontFamily: 'Calibri',
                        fontSize: 10,
                        fontColor: '#a0a0a0',
                        //fontStyle : 'bold'
                    },

                }

            ],
            xAxes: [{
                gridLines: {
                    offsetGridLines: true
                },
                ticks: {
                    fontFamily: 'Calibri',
                    fontSize: 10,
                    fontColor: '#a0a0a0',
                    //fontStyle : 'bold',
                    maxRotation: 0
                },
            }]
        },
        legend: {
            display: false,
            labels: {
                fontFamily: 'Calibri',
                fontSize: 10,
                fontColor: '#a0a0a0',
                fontStyle: 'bold',
            },
        }
    };

    public barChartLabels: Label[] = ['VP-Sales', 'Sr. Software Engineer', 'Sr. Tester', 'Project Manager', 'Product Owner'];
    public barChartType: ChartType = 'bar';
    public barChartLegend = false;
    public barChartPlugins = [];


    public barChartData: ChartDataSets[] = [
        {
            data: [65, 59, 80, 81, 56, 55, 40, 30, 10, 100], label: 'Risks by Titles', backgroundColor: [
                "cadetblue", "deepskyblue", "palegreen", "darkcyan", "lightcoral"
            ],
            borderColor: [
                "#111", "#111", "#111", "#111", "#111"
            ],
            borderWidth: 1
        }
    ];

    ngOnInit() { }

}
