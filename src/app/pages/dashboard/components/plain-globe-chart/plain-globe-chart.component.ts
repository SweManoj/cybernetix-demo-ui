import { Component, OnInit, Input, NgZone } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";

@Component({
  selector: 'app-plain-globe-chart',
  templateUrl: './plain-globe-chart.component.html'
})
export class PlainGlobeChartComponent {

  constructor(private zone: NgZone) { }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initializeChart();
    });
  }

  initializeChart() {
    // Create map instance
    var chart = am4core.create("plainGlobeChart", am4maps.MapChart);

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

    polygonSeries.useGeodata = true;

    polygonSeries.calculateVisualCenter = true;
    polygonSeries.tooltip.background.fillOpacity = 0.2;
    polygonSeries.tooltip.background.cornerRadius = 20;

    const template = polygonSeries.mapPolygons.template;
    template.nonScalingStroke = true;
    template.fill = am4core.color("#007ad9");
    template.stroke = am4core.color("#007ad9");

    polygonSeries.calculateVisualCenter = true;
    template.propertyFields.id = "id";
    template.tooltipPosition = "fixed";
    template.fillOpacity = 1;

    template.events.on("over", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = true;
      }
    })
    template.events.on("out", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = false;
      }
    })

    const hs = polygonSeries.mapPolygons.template.states.create("hover");
    hs.properties.fillOpacity = 1;
    hs.properties.fill = am4core.color("#76b7ea");

    var colorSet = new am4core.ColorSet();

    // Disable zoom and pan
    chart.maxZoomLevel = 1;
    chart.seriesContainer.draggable = false;
    chart.seriesContainer.resizable = false;

    const measelsSeries = chart.series.push(new am4maps.MapPolygonSeries())
    measelsSeries.tooltip.background.fillOpacity = 0;
    measelsSeries.tooltip.background.cornerRadius = 20;
    measelsSeries.tooltip.autoTextColor = true;
    measelsSeries.tooltip.label.fill = am4core.color("#000");
    measelsSeries.tooltip.dy = -5;

    const measelTemplate = measelsSeries.mapPolygons.template;
    measelTemplate.fill = am4core.color("red");
    measelTemplate.strokeOpacity = 0;
    measelTemplate.fillOpacity = 0.75;
    measelTemplate.tooltipPosition = "fixed";

    const hs2 = measelsSeries.mapPolygons.template.states.create("hover");
    hs2.properties.fillOpacity = 1;
    hs2.properties.fill = am4core.color("#86240c");

    polygonSeries.events.on("inited", function () {
      polygonSeries.mapPolygons.each(function (mapPolygon) {
        let count = data[mapPolygon.id];

        if (count > 0) {
          let polygon = measelsSeries.mapPolygons.create();
          polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
          polygon.tooltipText = mapPolygon.dataItem.dataContext['name'] + ": " + count;
          mapPolygon.dummyData = polygon;
          polygon.events.on("over", function () {
            mapPolygon.isHover = true;
          })
          polygon.events.on("out", function () {
            mapPolygon.isHover = false;
          })
        }
        else {
          //mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
          mapPolygon.fillOpacity = 0.9;
        }

      })
    })

    // https://developer.chrome.com/webstore/i18n -> find national keyword
    let data = {
      "IN": 4,  // India
      "TW":2,     // Taiwan
      "CN":3,     // China
      "US":13,    // United States
      "RU":2,     // Russia
      /* "AL": 58,
      "AM": 65,
      "AO": 28,
      "AR": 32,
      "AT": 109,
      "AU": 52,
      "AZ": 18,
      "BA": 24,
      "BD": 13,
      "BE": 12,
      "BF": 93,
      "BG": 68,
      "BI": 95,
      "BJ": 93,
      "BR": 49,
      "BT": 13,
      "BY": 216,
      "CA": 96,
      "CD": 69,
      "CF": 57,
      "CG": 197,
      "CH": 19,
      "CI": 14,
      "MZ": 49,
      "NA": 12,
      "NE": 80,
      "NG": 31,
      "NL": 47,
      "NO": 47,
      "NP": 10,
      "NZ": 23,
      "PE": 29,
      "PK": 159,
      "PL": 24,
      "PT": 68,
      "RO": 63,
      "RS": 73,
      "RU": 24,
      "RW": 45,
      "SE": 64,
      "SG": 88,
      "SI": 37,
      "SK": 112,
      "SN": 37,
      "SO": 83,
      "SS": 19,
      "TD": 75,
      "TG": 34,
      "TH": 81,
      "TL": 96,
      "TN": 78,
      "TR": 78,
      "UA": 143,
      "UG": 62,
      "US": 32,
      "UZ": 99,
      "VE": 179,
      "ZA": 38,
      "ZM": 30,
      "ZW": 25 */
    }
  }

}
