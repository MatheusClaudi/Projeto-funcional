import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';

@Component({
  selector: 'app-commits-feature',
  templateUrl: './commits-feature.component.html',
  styleUrls: ['./commits-feature.component.css']
})
export class CommitsFeatureComponent implements OnInit {

  constructor(
    private stateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Análise de features')
  }

}
