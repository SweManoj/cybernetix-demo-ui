import { Component, OnInit, NgZone } from "@angular/core";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";

am4core.useTheme(am4themes_animated);
@Component({
    selector: "globe-chart",
    templateUrl: "./globe-chart.component.html"
})
export class GlobeChartComponent implements OnInit {
    private am4maps: am4maps.MapChart;

    constructor(private zone: NgZone) {}

    ngOnInit() {}

    initializePlainGlobe() {
        // Create map instance
        var chart = am4core.create("chartGlobeDiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow; // am4geodata_worldHigh

        // Set projection
        chart.projection = new am4maps.projections.Miller(); // Mercator

        // Create polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.exclude = ["AQ"]; // Exclude Antractica
        polygonSeries.tooltip.fill = am4core.color("#000000");

        polygonSeries.mapPolygons.template.fill = am4core.color("#225DA2"); // city fill color
        polygonSeries.mapPolygons.template.stroke = am4core.color("#225DA2"); // city border

        var colorSet = new am4core.ColorSet();

        // Configure polygons
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.togglable = true;

        // Set events to apply "active" state to clicked polygons
        /* var currentActive;
        polygonTemplate.events.on("hit", function(event) {
            // if we have some country selected, set default state to it
            if (currentActive) {
                currentActive.setState("default");
            }
            chart.maxZoomLevel = 32;
            chart.zoomToMapObject(event.target);
            currentActive = event.target;
            chart.maxZoomLevel = 1;
        }); */

        // Configure states
        // @see {@link https://www.amcharts.com/docs/v4/concepts/states/}

        // Configure "hover" state
        var hoverState = polygonTemplate.states.create("hover");
        hoverState.properties.fill = colorSet.getIndex(0);

        // Configure "active" state
        var activeState = polygonTemplate.states.create("active");
        activeState.properties.fill = colorSet.getIndex(4);

        // Disable zoom and pan
        chart.maxZoomLevel = 1;
        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = false;

        // Export - img, pdf
        // chart.exporting.menu = new am4core.ExportMenu();

        // Zoom control
        /*  chart.zoomControl = new am4maps.ZoomControl();

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
        }; */

        // Create map polygon series
        /* var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        // polygonSeries.mapPolygons.template.fill = chart.colors.getIndex(0).lighten(0.5);
        polygonSeries.mapPolygons.template.fill = am4core.color("#225DA2");
        polygonSeries.mapPolygons.template.stroke = am4core.color("#225DA2"); // countries border lines
        polygonSeries.mapPolygons.template.nonScalingStroke = true;
        polygonSeries.exclude = ["AQ"];
 */
        // Add line bullets
        /*  var cities = chart.series.push(new am4maps.MapImageSeries());
        cities.mapImages.template.nonScaling = true;

        var city = cities.mapImages.template.createChild(am4core.Circle);
        city.radius = 6;
        // city.fill = chart.colors.getIndex(0).brighten(-0.2);
        city.fill = am4core.color('#FCD94E'); // city mentioned round inside color and connector line color
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
        var paris = addCity({ "latitude": 48.8567, "longitude": 2.3510 }, "Paris");
        var toronto = addCity({ "latitude": 43.8163, "longitude": -79.4287 }, "Toronto");
        var la = addCity({ "latitude": 34.3, "longitude": -118.15 }, "Los Angeles");
        var havana = addCity({ "latitude": 23, "longitude": -82 }, "Havana");

        // Add lines
        var lineSeries = chart.series.push(new am4maps.MapArcSeries());
        lineSeries.mapLines.template.line.strokeWidth = 2.5;
        lineSeries.mapLines.template.line.strokeOpacity = 0.5;
        lineSeries.mapLines.template.line.stroke = city.fill;
        // lineSeries.mapLines.template.line.fill = am4core.color('#FCD94E'); // color between up and down flight shadow
        lineSeries.mapLines.template.line.nonScalingStroke = true;
        lineSeries.mapLines.template.line.strokeDasharray = "1,1";
        lineSeries.zIndex = 10;

        var shadowLineSeries = chart.series.push(new am4maps.MapLineSeries());
        shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
        shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
        shadowLineSeries.mapLines.template.shortestDistance = false;
        shadowLineSeries.zIndex = 5;

        function addLine(from, to) {
            var line = lineSeries.mapLines.create();
            line.imagesToConnect = [from, to];
            line.line.controlPointDistance = -0.3;

            var shadowLine = shadowLineSeries.mapLines.create();
            shadowLine.imagesToConnect = [from, to];

            return line;
        }

        addLine(paris, toronto);
        addLine(toronto, la);
        addLine(la, havana);
 */
        // Add plane
        /* var plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
        plane.position = 0;
        plane.width = 48;
        plane.height = 48;
        
        plane.adapter.add("scale", (scale, target) => {
            return 0.5 * (1 - (Math.abs(0.5 - target.position)));
        })
        
        var planeImage = plane.createChild(am4core.Sprite);
        planeImage.scale = 0.08;
        planeImage.horizontalCenter = "middle";
        planeImage.verticalCenter = "middle";
        planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        planeImage.fill = chart.colors.getIndex(2).brighten(-0.2);
        planeImage.strokeOpacity = 0;
        
        var shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
        shadowPlane.position = 0;
        shadowPlane.width = 48;
        shadowPlane.height = 48;
        
        var shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
        shadowPlaneImage.scale = 0.05;
        shadowPlaneImage.horizontalCenter = "middle";
        shadowPlaneImage.verticalCenter = "middle";
        shadowPlaneImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        shadowPlaneImage.fill = am4core.color("#000");
        shadowPlaneImage.strokeOpacity = 0; */

        /* shadowPlane.adapter.add("scale", (scale, target) => {
            target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
            return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
        }) */

        // Plane animation
        var currentLine = 0;
        var direction = 1;
        /* function flyPlane() {
        
            // Get current line to attach plane to
            plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
            plane.parent = lineSeries;
            shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
            shadowPlane.parent = shadowLineSeries;
            shadowPlaneImage.rotation = planeImage.rotation;
        
            // Set up animation
            var from, to;
            var numLines = lineSeries.mapLines.length;
            if (direction == 1) {
                from = 0
                to = 1;
                if (planeImage.rotation != 0) {
                    planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
                    return;
                }
            }
            else {
                from = 1;
                to = 0;
                if (planeImage.rotation != 180) {
                    planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane); // on, off
                    return;
                }
            }
        
            // Start the animation
            var animation = plane.animate({
                from: from,
                to: to,
                property: "position"
            }, 5000, am4core.ease.sinInOut);
            animation.events.on("animationended", flyPlane)
            animation.events.on("animationprogress", function (ev) {
                var progress = Math.abs(ev.progress - 0.5);
                console.log(progress);
                planeImage.scale += 0.2;
            });
        
            shadowPlane.animate({
                from: from,
                to: to,
                property: "position"
            }, 5000, am4core.ease.sinInOut);
        
            // Increment line, or reverse the direction
            currentLine += direction;
            if (currentLine < 0) {
                currentLine = 0;
                direction = 1;
            }
            else if ((currentLine + 1) > numLines) {
                currentLine = numLines - 1;
                direction = -1;
            }
        
        } */

        // Go!
        // flyPlane();
    }

    intializeOrthographicGlobe() {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create map instance
        var chart = am4core.create("chartGlobeDiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = am4geodata_worldLow;

        // Set projection
        chart.projection = new am4maps.projections.Orthographic(); // Miller - Rectangle
        chart.panBehavior = "rotateLongLat";

        var grid = chart.series.push(new am4maps.GraticuleSeries());
        grid.toBack();

        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());

        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.nonScalingStroke = true;
        polygonSeries.mapPolygons.template.strokeOpacity = 0.5;

        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = chart.colors.getIndex(0);

        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = chart.colors.getIndex(0).brighten(-0.5);

        let linkContainer = chart.createChild(am4core.Container);
        linkContainer.isMeasured = false;
        linkContainer.layout = "horizontal";
        linkContainer.x = am4core.percent(50);
        linkContainer.y = am4core.percent(90);
        linkContainer.horizontalCenter = "middle";

        // text in the page
        /* let orthographic = linkContainer.createChild(am4core.TextLink);
        orthographic.margin(10, 10, 10, 10);
        orthographic.text = "Orthographic";
        orthographic.events.on("hit", function () {
            chart.projection = new am4maps.projections.Orthographic();
        }) */
    }

    initializeDonutChart() {
        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        var chart = am4core.create("chartDonutDiv", am4charts.PieChart);

        // Add data
        chart.data = [
            {
                country: "Lithuania",
                litres: 501.9
            },
            {
                country: "Czech Republic",
                litres: 301.9
            },
            {
                country: "Ireland",
                litres: 201.1
            },
            {
                country: "Germany",
                litres: 165.8
            },
            {
                country: "Australia",
                litres: 139.9
            },
            {
                country: "Austria",
                litres: 128.3
            }
        ];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.innerRadius = am4core.percent(50);
        pieSeries.ticks.template.disabled = true;
        pieSeries.labels.template.disabled = true;

        var rgm = new am4core.RadialGradientModifier();
        rgm.brightnesses.push(-0.8, -0.8, -0.5, 0, -0.5);
        pieSeries.slices.template.fillModifier = rgm;
        pieSeries.slices.template.strokeModifier = rgm;
        pieSeries.slices.template.strokeOpacity = 0.4;
        pieSeries.slices.template.strokeWidth = 0;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "bottom";
        chart.legend.fill=am4core.color('red')
        chart.legend.fill.lightColor = am4core.color('white')
    }

    ngAfterViewInit() {
        this.zone.runOutsideAngular(() => {
            this.initializePlainGlobe();

            this.initializeDonutChart();

            // this.intializeOrthographicGlobe();
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
