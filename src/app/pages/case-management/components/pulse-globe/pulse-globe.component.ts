import { Component, OnInit, NgZone, ViewChild } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import { Table } from "primeng/table";

am4core.useTheme(am4themes_animated);

@Component({
    selector: "app-pulse-globe",
    templateUrl: "./pulse-globe.component.html"
})
export class PulseGlobeComponent implements OnInit {
    @ViewChild("attack") attack: Table;

    private am4maps: am4maps.MapChart;
    liveAttacks: any[] = [];
    dummyAttacks: any[] = [];
    counter: number = 0;

    constructor(private zone: NgZone) {
        this.dummyAttacks = [
            {
                timpestamp: "2014-06-25 08:32:59.06",
                attacker: "CHINANET-HN Hengyang",
                attackIp: "218.77.79.43",
                targetIp:"1.1.1.1",
                attackerGeo: "Changsha, China",
                targetGeo: "Kirksville, United States",
                type: "ms-term-service",
                port: "3389"
            },
            {
                timpestamp: "2014-06-25 08:32:59.06",
                attacker: "Primesoft NZ LTD",
                attackIp: "201.36.227.103",
                targetIp:"1.1.1.1",
                attackerGeo: "Shanghai, China",
                targetGeo: "Miami, United States",
                type: "ssh",
                port: "22"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "Beijing Sanxin Shidai Co.Ltd",
                attackIp: "118.192.48.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Beijing, China",
                targetGeo: "Seattle, United States",
                type: "smtp",
                port: "523539"
            }
        ];

        this.liveAttacks = [
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "Beijing Sanxin Shidai Co.Ltd",
                attackIp: "118.192.48.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Beijing, China",
                targetGeo: "Seattle, United States",
                type: "smtp",
                port: "35"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "CHINANET-HN Hengyang",
                attackIp: "118.192.48.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Shanghai, China",
                targetGeo: "Seattle, United States",
                type: "smtp",
                port: "17"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "Beijing Sanxin Shidai Co.Ltd",
                attackIp: "118.192.48.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Kirksville, United States",
                targetGeo: "Seattle, United States",
                type: "smtp",
                port: "445"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "CHINANET-HN Hengyang",
                attackIp: "20.192.23.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Beijing, China",
                targetGeo: "Kirksville, United States",
                type: "smtp",
                port: "17536"
            }/* ,
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "Beijing Sanxin Shidai Co.Ltd",
                attackIp: "10.179.48.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Shanghai, China",
                targetGeo: "Seattle, United States",
                type: "smtp",
                port: "523539"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "CHINANET-HN Hengyangd",
                attackIp: "10.142.48.23",
                targetIp:"1.1.1.1",
                attackerGeo: "Beijing, China",
                targetGeo: "Seattle, United States",
                type: "CrazyNet",
                port: "22"
            },
            {
                timpestamp: "2014-06-25 08:32:59.98",
                attacker: "Kirksville, United States",
                attackIp: "30.333.30.27",
                targetIp:"1.1.1.1",
                attackerGeo: "Shanghai, China",
                targetGeo: "Seattle, United States",
                type: "qotd",
                port: "67"
            } */
        ];
    }

    ngOnInit() {
        /* setInterval(() => {
            this.counter = 0;
            setInterval(() => {
                this.counter++;
                let data = this.liveAttacks[this.counter];
                if (data) {
                    this.dummyAttacks.unshift(data);
                }
            }, 500);
        }, 1000); */
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            // Create map instance
            var chart = am4core.create("globeChartDiv", am4maps.MapChart);

            // Set map definition
            chart.geodata = am4geodata_worldLow;

            // Set projection
            chart.projection = new am4maps.projections.Orthographic();
            chart.panBehavior = "rotateLongLat";
            chart.deltaLatitude = -20;
            chart.padding(20, 20, 20, 20);

            // Zoom control
            /*          chart.zoomControl = new am4maps.ZoomControl();

            var homeButton = new am4core.Button();
            homeButton.events.on("hit", function () {
                chart.goHome();
            });

            homeButton.icon = new am4core.Sprite();
            homeButton.padding(7, 5, 7, 5);
            homeButton.width = 30;
            homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
            homeButton.marginBottom = 10;
            homeButton.parent = chart.zoomControl;
            homeButton.insertBefore(chart.zoomControl.plusButton);

            // Center on the groups by default
            chart.homeZoomLevel = 3.5;
            chart.homeGeoPoint = { longitude: 10, latitude: 52 }; // 10,52 - original

            chart.geodata = am4geodata_worldLow;
            chart.projection = new am4maps.projections.Miller();
            chart.homeZoomLevel = .5;
            chart.homeGeoPoint = {
                latitude: 30,  // 38   - from top side
                longitude: 5 // -60   - from left side
            };
*/

            // Create map polygon series
            var polygonSeries = chart.series.push(
                new am4maps.MapPolygonSeries()
            );

            // Make map load polygon (like country names) data from GeoJSON
            polygonSeries.useGeodata = true;

            // Configure series
            var polygonTemplate = polygonSeries.mapPolygons.template;
            polygonTemplate.tooltipText = "{name}";
            polygonTemplate.fill = am4core.color("#225DA2");
            polygonTemplate.stroke = am4core.color("#225DA2");
            polygonTemplate.strokeWidth = 0.5;

            var graticuleSeries = chart.series.push(
                new am4maps.GraticuleSeries()
            );
            graticuleSeries.mapLines.template.line.stroke = am4core.color(
                "#ffffff"
            );
            graticuleSeries.mapLines.template.line.strokeOpacity = 0.08;
            graticuleSeries.fitExtent = false;

            chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.1;
            chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(
                "#ffffff"
            );

            // Create hover state and set alternative fill color
            var hs = polygonTemplate.states.create("hover");
            hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

            let animation;
            setTimeout(function() {
                animation = chart.animate(
                    { property: "deltaLongitude", to: 100000 },
                    20000000
                );
            }, 3000);

            chart.seriesContainer.events.on("down", function() {
                if (animation) {
                    animation.stop();
                }
            });

            // Add line bullets
            var cities = chart.series.push(new am4maps.MapImageSeries());
            cities.mapImages.template.nonScaling = true;

            var city = cities.mapImages.template.createChild(am4core.Circle);
            city.radius = 6;
            // city.fill = chart.colors.getIndex(0).brighten(-0.2);
            city.fill = am4core.color("#FCD94E"); // city mentioned round inside color and connector line color
            city.strokeWidth = 2;
            city.stroke = am4core.color("#fff"); // city mentioned round color

            function addCity(coords, title) {
                var city = cities.mapImages.create();
                city.latitude = coords.latitude;
                city.longitude = coords.longitude;
                city.tooltipText = title;
                return city;
            }

            // Directions
            var paris = addCity(
                { latitude: 48.8567, longitude: 2.351 },
                "Paris"
            );
            var toronto = addCity(
                { latitude: 43.8163, longitude: -79.4287 },
                "Toronto"
            );
            var la = addCity(
                { latitude: 34.3, longitude: -118.15 },
                "Los Angeles"
            );
            var havana = addCity({ latitude: 23, longitude: -82 }, "Havana");

            // Add lines
            var lineSeries = chart.series.push(new am4maps.MapLineSeries());
            lineSeries.mapLines.template.line.strokeWidth = 2.5;
            lineSeries.mapLines.template.line.strokeOpacity = 0.5;
            lineSeries.mapLines.template.line.stroke = city.fill;
            // lineSeries.mapLines.template.line.fill = am4core.color('#FCD94E'); // color between up and down flight shadow
            lineSeries.mapLines.template.line.nonScalingStroke = true;
            //lineSeries.mapLines.template.line.strokeDasharray = "1,1";
            lineSeries.zIndex = 10;

            var shadowLineSeries = chart.series.push(
                new am4maps.MapLineSeries()
            );
            shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
            shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
            shadowLineSeries.mapLines.template.shortestDistance = false;
            shadowLineSeries.zIndex = 5;

            function addLine(from, to) {
                var line = lineSeries.mapLines.create();
                line.imagesToConnect = [from, to];
                //line.line.controlPointDistance = -0.3;

                var shadowLine = shadowLineSeries.mapLines.create();
                shadowLine.imagesToConnect = [from, to];

                return line;
            }

            addLine(paris, toronto);
            addLine(toronto, la);
            addLine(la, havana);

            // Disable zoom and pan
            chart.maxZoomLevel = 1;
            chart.seriesContainer.draggable = false;
            chart.seriesContainer.resizable = false;
        });
    }

    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.am4maps) {
                this.am4maps.dispose();
            }
        });
    }
}
