import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'map-chart',
  templateUrl: './map-chart.component.html',
  // styleUrls: ['./map-chart.component.scss']
})
export class MapChartComponent implements OnInit {

  @Input() componentType: string;

  public barChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true
          }
        }
      ]
    },
    legend: {
      display: false
    }

  };


  public barChartType: string = 'line';
  public barChartLabels: string[] = ['MAY', 'JUL', 'SEP', 'NOV'];
  public barChartData: any[] = [{ data: [10, 50, 10, 15], label: 'All Jobs',/*  backgroundColor: '#f9d8d8', borderColor: '#f9d8d8' */ },
  { data: [0, 60, 20, 30], label: 'Completed Jobs'/* , backgroundColor: '#f3e1c3', borderColor: '#f9c870' */ },
  { data: [5, 30, 80, 12], label: 'In Process Jobs'/* , backgroundColor: '#fbfbbf', borderColor: '#fbfbbf'  */},
  ];

  userData = [
    { userName: 'Ethan Smith', discription: 'Guys, check this out: I am not able to find any bug in this app', time: 'Today at 12:30pm' },
    { userName: 'Ethan Smith', discription: 'Guys, check this out: I am not able to find any bug in this app', time: 'Today at 12:30pm' },
    { userName: 'Ethan Smith', discription: 'Guys, check this out: I am not able to find any bug in this app', time: 'Today at 12:30pm' }
  ];

  data: any;
  options: any;

  constructor() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'],
      datasets: [
        {
          label: 'High',
          backgroundColor: '#f00', //red
          borderColor: '#f00',
          data: [40, 59, 23, 81, 11, 55, 40, 23]
        },
        {
          label: 'Medium',
          backgroundColor: '#FFA500', // orange
          borderColor: '#FFA500',
          data: [28, 48, 40, 19, 86, 27, 65, 39]
        },
        {
          label: 'Low',
          backgroundColor: '#FFFF00',  // green
          borderColor: '#FFFF00',
          data: [34, 12, 56, 8, 34, 77, 12, 55]
        }
      ]
    }

    this.options = {
      responsive: true,
      title: {
        display: false,
        circumference: 50 * Math.PI,
        text: 'My Title',
        fontSize: 16
      },
      legend: {
        display: true,
        position: 'bottom',
        spacing: 25
      }
    };
  }

  selectData($event) {
  }

  ngOnInit() {
  }

}
