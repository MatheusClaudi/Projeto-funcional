import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChartComponent } from './line-chart/line-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphChartComponent } from './graph-chart/graph-chart.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';

@NgModule({
  declarations: [
    LineChartComponent,
    GraphChartComponent
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxGraphModule
  ],
  exports: [
    LineChartComponent,
    GraphChartComponent
  ]
})
export class ChartModule { }
