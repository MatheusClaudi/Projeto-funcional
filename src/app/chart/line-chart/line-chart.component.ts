import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() xAxisLabel: string = '';
  @Input() yAxisLabel: string = '';
  @Input() title: string = '';
  @Input() data = []

  // options 
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  timeline: boolean = true;
  colorScheme: any = {
    domain: ['#5AA454']
  };

  constructor() {}

  ngOnInit(): void {}
}
