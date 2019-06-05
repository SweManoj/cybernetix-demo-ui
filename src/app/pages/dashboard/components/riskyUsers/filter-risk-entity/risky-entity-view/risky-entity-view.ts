import { Component, OnInit, NgZone, Input } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-risky-entity-view',
  templateUrl: './risky-entity-view.html'
})
export class RiskyEntityViewComponent {

  @Input('filteredRiskyEntity') entity: any;

  constructor(private zone: NgZone) {
  }

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      // Initialize Guage meter chart
      // this.initializeGuageMeterChart();
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

      let chart = ev.target;

    });

    var axis = chart.xAxes.push(new am4charts.ValueAxis<am4charts.AxisRendererCircular>());
    axis.min = 0;
    axis.max = 100;
    axis.strictMinMax = true;
    axis.renderer.grid.template.stroke = new am4core.InterfaceColorSet().getFor("background");
    axis.renderer.grid.template.strokeOpacity = 0.3;

    axis.fontSize = 12;
    axis.renderer.labels.template.radius = 4;

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
    hand.fill = am4core.color("#2D93AD");   // hand color
    hand.stroke = am4core.color("#2D93AD");

    chart.setTimeout(randomValue, 2000);

    function randomValue() {
      hand.showValue(65, 1000, am4core.ease.cubicOut);
      chart.setTimeout(randomValue, 2000);
    }
  }

}
