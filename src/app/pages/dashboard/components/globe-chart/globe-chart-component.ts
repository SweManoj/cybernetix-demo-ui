import {Component, OnInit, NgZone, Input, AfterViewInit} from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../dashboard.service';


am4core.useTheme(am4themes_animated);
@Component({
    selector: "globe-chart",
    templateUrl: "./globe-chart.component.html"
})
export class GlobeChartComponent implements AfterViewInit {
    @Input() componentType: string;
    riskScoreByDepartments = [];
    riskScoreByTitles = [];
    riskScoreByTitleCount = [];
    color = ["cadetblue", "deepskyblue", "palegreen", "darkcyan", "lightcoral"];
    
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
            align: 'left',
            style : { color : '#a0a0a0', fontWeight : 'bold', fontFamily : 'roboto' },
            text: 'RISK BY DEPARTMENT',
            x: 8,
            y: 24
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
                color: '#E0E0E3',
                fontWeight: 'none'
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

    public riskByTitleOptions : any = {
        credits : {
            enabled : false
        },

        chart: {
            backgroundColor: '#041421',
            type: 'column'
          },
          title: {
            align: 'left',
            style : { color : '#a0a0a0', fontWeight : 'bold', fontFamily : 'roboto' },
            text: 'RISK BY TITLE',
            x: 8,
            y: 24
          },
          xAxis: {
            categories: [
              'VP-Sales', 'Software Engineer', 'Sr. Tester', 'Project Manager', 'Product Owner'
            ],
            labels : {
                step: 1,
                width : "20px",
              style : { color : '#fff'},            
            }
          },
          yAxis: {
            min: 0,
            lineWidth: 0,
            minorGridLineWidth: 0,
            gridLineColor: 'transparent',
            title: {
              style : { color : '#fff'},
              text: 'Risk Score'
            },
            labels : {
              style : { color : '#fff'},
            }
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
          },
          legend: {
            itemStyle: {
                color: '#E0E0E3',
                fontWeight: 'none'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            },
            showInLegend: false
          },
          series: [{
            showInLegend: false,   
            name: 'Risk Score',
            data: [{ y : 65, color : '#2b908f'},
            {y: 80, color : '#90ee7e'},
            {y: 75, color : '#7798BF'}, 
            {y : 35, color : '#55BF3B'},
            {y : 65, color : '#DF5353'}]

          }]
    }
    

    constructor(private zone: NgZone,private dashboardService: DashboardService) { }

    ngAfterViewInit() {
        /*this.dashboardService.getRiskCountByDepartment().subscribe((res: any) => {
           
            res.forEach(riskScoreByDept => {
              this.riskScoreByDepartments.push({'name' : riskScoreByDept.departName, 'y' : riskScoreByDept.riskScoreCount})
            })
             this.options.series[0].data = this.riskScoreByDepartments;
             Highcharts.chart('container', this.options);
        });

         this.dashboardService.getRiskCountByTitle().subscribe((res: any) => {
           let i = 0
            res.forEach(riskScoreByTitleObj => {
              this.riskScoreByTitles.push(riskScoreByTitleObj.title);
              this.riskScoreByTitleCount.push({ y : riskScoreByTitleObj.riskScoreCount, color : this.color[i]})
              i++
            })
             this.riskByTitleOptions.xAxis.categories = this.riskScoreByTitles;
             this.riskByTitleOptions.series[0].data = this.riskScoreByTitleCount;
             Highcharts.chart('riskByTitleContainer', this.riskByTitleOptions);
        });*/
       
         Highcharts.chart('container', this.options);
          Highcharts.chart('riskByTitleContainer', this.riskByTitleOptions);
    }

}
