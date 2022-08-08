import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';

@Component({
  selector: 'app-commits-ranking',
  templateUrl: './commits-ranking.component.html',
  styleUrls: ['./commits-ranking.component.css']
})
export class CommitsRankingComponent implements OnInit {

  constructor(
    private stateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Quantidade de commits por desenvolvedor')
  }

}
