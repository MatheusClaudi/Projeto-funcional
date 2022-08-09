import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';
import Utils from "../../../_util/util"

@Component({
  selector: 'app-commits-ranking',
  templateUrl: './commits-ranking.component.html',
  styleUrls: ['./commits-ranking.component.css']
})
export class CommitsRankingComponent implements OnInit {

  public count_names : any = []

  constructor(
    private stateService: SharedStateService
  ) {
    this.stateService.rawCommits.subscribe((data) => { 

      data = data.map((x : any) => x.commit.author);

      let authors = Utils.groupBy<any>(data,'name');

      let counts = authors.map((x : any) => {
        let name : string = Object.keys(x)[0];
        return [x[name].length,name];
      })

      counts = counts.sort((x : any,y : any) => y[0] - x[0]);
      
      this.count_names = counts;
    });
  }

  ngOnInit(): void {
    this.stateService.getCommitsFromAPI();
    this.stateService.updateCurrentSection('Quantidade de commits por desenvolvedor')
  }

}
