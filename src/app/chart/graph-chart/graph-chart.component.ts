import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.css']
})
export class GraphChartComponent implements OnInit {

  curve = shape.curveBundle.beta(1);
  boxColor = '#0000FF';
  @Input() nodes: any;
  @Input() links: any;

  constructor() { }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes)
  }

  goToNode(node: any) {
    window.open(node.url, "_blank");
  }

  formatText(text: string) {
    let theshold = 9;
    return text.length < theshold ? text : `${text.substring(0, theshold-1)}...`
  }
}
