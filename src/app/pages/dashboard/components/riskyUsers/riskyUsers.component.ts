import { AfterContentInit, Component, OnInit, NgZone } from '@angular/core';
import { RiskyUserService } from './riskyUser.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import * as moment from 'moment';
import * as d3 from 'd3';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ContentModalComponent } from './riskyUsers-modal/riskyUsers-modal.component';
import { RiskyUserInfoModalComponent } from './risky-user-info-modal/risky-user-info-modal.component';
import { bubbleDataMonth } from './data';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import material from "@amcharts/amcharts4/themes/material";
import am4themes_dark from "@amcharts/amcharts4/themes/amchartsdark"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import { AmChartsService, AmChart } from '@amcharts/amcharts3-angular';
import { DatePipe } from '@angular/common';
import { RiskScoreModalComponent } from './risk-score-modal/risk-score-modal.component';
import { TopDetailsService } from '../topDetails/topDetails.service';

@Component({
    selector: 'risky-users',
    templateUrl: './riskyUsers.component.html'
})
export class RiskyUsersComponent {

    selectedUser: string = null;
    allUsers: any = [];
    selectedDateRange: string;
    dateRanges = ['1 Week', '2 Weeks', '1 Month', '3 Months', '6 Months', '1 Year'];
    totalRecords: number = 0;
    recordsReturned: number = 0;
    selectedUserDetails: any = {};
    selectedView = 'timeline';
    private offset: number = 0;
    selectedUserInfo: any [];
    userData: any ;
    riskyObjects = [
        { type: 'user', value: 'ADittmer', score: 94, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 89, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 81, img: true },
        { type: 'user', value: 'AWendler', score: 72, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 54, img: true },
        { type: 'ip address', value: '172.10.10.11', score: 200, img: false },
        { type: 'ip address', value: '82.102.21.217', score: 180, img: false },
        { type: 'ip address', value: '95.181.116.77', score: 125, img: false },
        { type: 'ip address', value: '23.94.213.6', score: 86, img: false },
        { type: 'ip address', value: '69.249.19.217', score: 25, img: false },
        { type: 'host', value: 'PUNDESK001', score: 180, img: false },
        { type: 'host', value: 'USADESK25', score: 89, img: false },
        { type: 'host', value: 'CHNLAP963', score: 65, img: false },
        { type: 'host', value: 'LONDESK588', score: 49, img: false },
        { type: 'host', value: 'AUSLAP4873', score: 30, img: false }
    ];
    
    threatCategories = [
        {
            title: 'Kill Chain',
            value: 'Actions/Maintain'
        },
        {
            title: 'Threat Category',
            value: 'Access Authentication'
        },
        {
            title: 'Sub Category',
            value: 'Bruce Force Attack'
        }
    ]

    dummyDatas = [
        {
            title: 'Affected Entity',
            value: ''
        },
        {
            title: 'Locations',
            value: ''
        },
        {
            title: 'Status',
            value: ''
        },
        {
            title: 'Resources',
            value: ''
        },
        {
            title: 'Indicators',
            value: ''
        },
        /* {
            title: 'Priority',
            value: 'Be sure to add aria-expanded to the control element. This attribute explicitly conveys the current state of the collapsible'
        } */
    ];

    hardCodeItemData = [
        {
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV 083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
            }
        },
        {
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV 061',
            riskScore: 483,
            ruleInfo: {
                ruleId: 2,
                title: 'Successful Logon from Rare Machine - Windows'
            }
        },
        {
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV 039',
            riskScore: 451,
            ruleInfo: {
                ruleId: 3,
                title: 'Unusual Data Exfiltration By Service Account - Proxy'
            }
        },
        {
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV 041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            }
        },
        {
            generatedTimestamp: '14:45:00',
            accord: false,
            pv: 'PV 069',
            riskScore: 243,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Process Executed - Windows'
            }
        },
        {
            generatedTimestamp: '17:14:00',
            accord: false,
            pv: 'PV 094',
            riskScore: 149,
            ruleInfo: {
                ruleId: 6,
                title: 'Multiple Users Logged-In Successfully From Same IP'
            }
        }
    ];

    constructor(private amChartService: AmChartsService, private riskyUserService: RiskyUserService, private routeParam: ActivatedRoute, private modalService: NgbModal,
        private zone: NgZone, private router: Router,private topDetailsService: TopDetailsService) {
        this.offset = 0;
        this.recordsReturned = 0;
        this.selectedDateRange = '1 Week';
        
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            // Initialize Guage meter chart
            this.initializeGuageMeterChart();

            // Initialize Bubble chart
            this.initializeBubbleChart();
        });
    }

    initializeGuageMeterChart() {

        am4core.useTheme(am4themes_animated);
        // create chart
        var chart = am4core.create("chartGuageDiv", am4charts.GaugeChart);
        chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

        chart.innerRadius = -20;

        // Set cell size in pixels
        let cellSize = 30;
        chart.events.on("datavalidated", function (ev) {

            // Get objects of interest
            let chart = ev.target;
            /* let categoryAxis = chart.yAxes.getIndex(0);
        
            // Calculate how we need to adjust chart height
            let adjustHeight = chart.data.length * cellSize - categoryAxis.pixelHeight;
        
            // get current chart height
            let targetHeight = chart.pixelHeight + adjustHeight; */

            // Set it on chart's container
            // chart.svgContainer.htmlElement.style.height = 350 + "px";
        });

        // start and end angle
        /* chart.startAngle = 360;
        chart.endAngle = 0; */

        var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
        axis.min = 0;
        axis.max = 100;
        axis.strictMinMax = true;
        axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
        axis.renderer.grid.template.strokeOpacity = 0.3;


        // axis.fontSize = 0;
        /* axis.hidden = false;
        axis.fixedWidthGrid = true; */

        // axis.renderer.ticks.template.length = 35;
        // axis.renderer.grid.template.disabled = true;
        axis.fontSize = 12;
        axis.renderer.labels.template.radius = 4;   // space b/w meter and number
        /* axis.renderer.labels.template.adapter.add("text", function (text) {
            return text + "%";
        }) */

        var range0 = axis.axisRanges.create();
        range0.value = 0;
        range0.endValue = 45;
        range0.axisFill.fillOpacity = 1;
        range0.axisFill.fill = am4core.color('#ADFF2F')
        range0.axisFill.zIndex = - 1;

        var range1 = axis.axisRanges.create();
        range1.value = 45;
        range1.endValue = 75;
        range1.axisFill.fillOpacity = 1;
        range1.axisFill.fill = am4core.color('#FFA500')
        range1.axisFill.zIndex = -1;

        var range2 = axis.axisRanges.create();
        range2.value = 75;
        range2.endValue = 100;
        range2.axisFill.fillOpacity = 1;
        range2.axisFill.fill = am4core.color('#f00')
        range2.axisFill.zIndex = -1;

        var hand = chart.hands.push(new am4charts.ClockHand());
        hand.value = this.userData.score;
        hand.fill = am4core.color("#2D93AD");   // hand color
        hand.stroke = am4core.color("#2D93AD");

        // using chart.setTimeout method as the timeout will be disposed together with a chart
        chart.setTimeout(randomValue, 2000);

        function randomValue() {
            hand.showValue(this.userData.score, 1000, am4core.ease.cubicOut);
            chart.setTimeout(randomValue, 2000);
        }
    }

    initializeBubbleChart() {

        // Apply chart themes
        am4core.useTheme(am4themes_animated);

        var chart = am4core.create("bubbleChartdiv", am4charts.XYChart);

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        chart.maskBullets = false;

        let xAxis = chart.xAxes.push(new am4charts.DateAxis());
        //xAxis.dataFields.category = "date";

        let yAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        yAxis.dataFields.category = "hour";


        xAxis.dateFormats.setKey("day", "MMM dd, yyyy");
        xAxis.periodChangeDateFormats.setKey("day", "MMM dd, yyyy");


        xAxis.renderer.grid.template.disabled = false; // vertical line middle on the bubbles
        yAxis.renderer.grid.template.disabled = false; // Horizontal border line for the bubbles
        xAxis.renderer.axisFills.template.disabled = true; // vertical border - one by one column , not for all
        yAxis.renderer.axisFills.template.disabled = true; // horizontal border - one by one column , not for all
        yAxis.renderer.ticks.template.disabled = true;
        xAxis.renderer.ticks.template.disabled = true;


        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryY = "hour";
        series.dataFields.dateX = "date";
        series.dataFields.value = "value";
        series.columns.template.disabled = true; // background color for the columns
        series.sequencedInterpolation = true;
        series.tooltip.getFillFromObject = false;
        series.tooltip.background.fill = am4core.color("#2D93AD");
        series.defaultState.transitionDuration = 1000;

        var bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.tooltipText = "{policyViolated} : {value}";
        bullet.background.fill = am4core.color("black");
        bullet.strokeWidth = 2;
        bullet.stroke = am4core.color("#ffffff");
        bullet.propertyFields.fill = "color"; // provide dynamic color for bubbles
        bullet.strokeOpacity = 0;

        // tooltip rendering on the bubble
        bullet.adapter.add("tooltipY", (tooltipY, target) => {
            return 1; // -target.circle.radius + 1;
        })

        // size of the bubble increment
        series.heatRules.push({ property: "radius", target: bullet.circle, min: 6, max: 12 });

        bullet.hiddenState.properties.scale = 0.01;
        bullet.hiddenState.properties.opacity = 1;
        var hoverState = bullet.states.create("hover");
        hoverState.properties.strokeOpacity = 1;

        for (var x in bubbleDataMonth) {
            if (bubbleDataMonth[x].value > 0 && bubbleDataMonth[x].value <= 1)
                bubbleDataMonth[x].color = '#FFFF00';
            else if (bubbleDataMonth[x].value > 1 && bubbleDataMonth[x].value <= 3)
                bubbleDataMonth[x].color = '#FFA500';
            else if (bubbleDataMonth[x].value > 3)
                bubbleDataMonth[x].color = '#f00';
        }

        chart.data = bubbleDataMonth;


        // Add scrollbars
        chart.scrollbarX = new am4core.Scrollbar();
        chart.scrollbarY = new am4core.Scrollbar();

        // Add cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "zoomXY";
    }

    ngOnInit() {
        debugger
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedUser = params.get('selectedUser');
        

        this.selectedUserInfo = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
        this.selectedUserInfo.forEach(res => {
            debugger
            if(res.value == this.selectedUser) {
                this.userData = res;
            }
        })
    
        if (this.selectedUser) {
            const dotIndex = this.selectedUser.indexOf('.');
            const isResource = dotIndex !== -1;
            const selectedUserData = this.riskyUserService.getSelectedUserData(this.selectedUser, isResource);
            const selectedUserDataFromModel = this.riskyUserService.getSelectedUserDataFromModel(this.selectedUser, isResource);
            forkJoin([selectedUserData, selectedUserDataFromModel]).subscribe((results: any) => {
                const userData = results[0],
                    userDataFromModel = results[1];
                this.selectedUserDetails.userInfo = userData.userInfo && userData.userInfo[0] || {};
                this.selectedUserDetails.totalScore = userData.totalScore && userData.totalScore.total_riskscore || 0;
                /* this.selectedUserDetails.data = [];

                let data = userData && userData.data,
                    len = data && data.length, date;

                let j = 1;
                for (let i = 0; i < len; i++) {
                    const item = data[i];
                    date = moment(item.isotimestamp);
                    let pv = 'PV000';
                    const info = {
                        generatedTimestamp: date.utc().format('HH:mm:ss a'), // item.isotimestamp
                        riskScore: item.riskscore,
                        ruleInfo: item.ruleInfo[0],
                        userId: item.userid,
                        isotimestamp: item.isotimestamp,
                        accord: false,
                        pv: pv + j
                    };
                    this.selectedUserDetails.data.push(info);
                    j++;
                }

                if (userDataFromModel.totalScore && userDataFromModel.totalScore.total_riskscore) {
                    this.selectedUserDetails.totalScore = userDataFromModel.totalScore.total_riskscore + this.selectedUserDetails.totalScore;
                }
                data = userDataFromModel && userDataFromModel.data;
                len = data && data.length;
                for (let i = 0; i < len; i++) {
                    const item = data[i];
                    const info = {
                        generatedTimestamp: moment(item.isotimestamp).utc().format('HH:mm:ss a'), //moment(item.isotimestamp, 'YYYYMMDD'),
                        riskScore: item.riskscore,
                        ruleInfo: item.ruleInfo[0]
                    };
                    this.selectedUserDetails.data.push(info);
                } */
            });
            /*this.riskyUserService.getSelectedUserData(this.selectedUser, isResource).subscribe((res: any) => {
                const data = res.data,
                    len = data.length;
                this.selectedUserDetails.userInfo = res.userInfo && res.userInfo[0] || {};
                this.selectedUserDetails.data = [];
                for (let i = 0; i < len; i++) {
                    const item = data[i];
                    const info = {
                        generatedTimestamp: item.isotimestamp, //moment(item.isotimestamp, 'YYYYMMDD'),
                        riskScore: item.riskscore,
                        ruleInfo: item.ruleInfo[0]
                    };
                    this.selectedUserDetails.data.push(info);
                }
            });*/
            /*this.riskyUserService.getSelectedUserDataFromModel(this.selectedUser, isResource).subscribe((res: any) => {
                this.selectedUserDetails.userInfo = res.userInfo && res.userInfo[0] || {};
                this.selectedUserDetails.data = [];
                const data = res && res.data,
                    len = data && data.length;
                for (let i = 0; i < len; i++) {
                    const item = data[i];
                    const info = {
                        generatedTimestamp: item.isotimestamp, //moment(item.isotimestamp, 'YYYYMMDD'),
                        riskScore: item.riskscore,
                        ruleInfo: item.ruleInfo[0]
                    };
                    this.selectedUserDetails.data.push(info);
                }
            });*/
        } else {
            this.getAllUsers();
        }
    });
    }

    switchView(view) {
        this.selectedView = view;
    }

    getAllUsers() {
        this.riskyUserService.getUploadExceedData(this.offset).subscribe((res: any) => {
            this.totalRecords = res._totalRecords;
            this.allUsers = this.allUsers.concat(res.data);
            this.allUsers.sort((a, b) => {
                return b.riskscore - a.riskscore;
            });
            this.recordsReturned = this.allUsers.length;
        });
    }

    goToSummaryPage() {
        this.router.navigateByUrl('/policyViolationSummary');
    }

    loadMoreUsers() {
        this.offset++;
        this.getAllUsers();
    }

    open(ruilId, userId, isotimestamp) {
        const modalRef = this.modalService.open(RiskScoreModalComponent, { backdrop: 'static' }); // { size: 'sm' }
        modalRef.componentInstance.ruilId = ruilId;
        modalRef.componentInstance.userId = userId;
        modalRef.componentInstance.isotimestamp = isotimestamp;
    }

    openUserInfo(userInfo: any) {
        const modalRef = this.modalService.open(RiskyUserInfoModalComponent, { size: 'lg' });
        modalRef.componentInstance.userInfo = userInfo;
    }

    changeChartDateRange(dateRange: string) {
        this.selectedDateRange = dateRange;
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65)
            return "mediumseagreen";
        else if (riskScore > 65 && riskScore <= 79)
            return "darkorange";
        else
            return "crimson";
    }
}
