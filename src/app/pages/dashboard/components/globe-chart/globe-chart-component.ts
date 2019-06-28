import {Component, OnInit, NgZone, Input, AfterViewInit} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Highcharts from 'highcharts';

am4core.useTheme(am4themes_animated);
@Component({
    selector: "globe-chart",
    templateUrl: "./globe-chart.component.html"
})
export class GlobeChartComponent implements AfterViewInit {
    @Input() componentType: string;
    /*Highcharts: typeof Highcharts = Highcharts; // required
    chartConstructor: string = 'chart'; // optional string, defaults to 'chart'*/
    public options: any = {
        credits: {
            enabled: false
        },
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
        chart: {
            backgroundColor: '#041421',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            style : { color : '#a0a0a0'},
            text: 'Risk By Department'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        series: [{
            name: 'Risk Score',
            colorByPoint: true,
            data: [
                { name: 'IT Security', y: 61, sliced: true,
                    selected: true },
                { name: 'Infrastructure', y: 12 },
                { name: 'IT Support', y: 11 },
                { name: 'Quality Testing', y: 5 },
                { name: 'Development', y: 5 },
                { name: 'HR', y: 7 }
            ]
        }]
    }; // required


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

    ngAfterViewInit() {
        Highcharts.chart('container', this.options);
    }

}
