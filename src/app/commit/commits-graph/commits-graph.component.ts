import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';

@Component({
  selector: 'app-commits-graph',
  templateUrl: './commits-graph.component.html',
  styleUrls: ['./commits-graph.component.css']
})
export class CommitsGraphComponent implements OnInit {

  constructor(
    private stateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Árvore de evolução de commits')
  }

}
