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
  public rawCommitData: any = []
  public commitDataFiltered: any = []

  constructor(
    private stateService: SharedStateService
  ) {
    this.stateService.rawCommits.subscribe((data) => { 
      this.updateInfos(data);
      this.rawCommitData = data;
    });
  }

  ngOnInit(): void {
    this.stateService.getCommitsFromAPI();
    this.stateService.updateCurrentSection('Quantidade de commits por desenvolvedor')
  }

  updateInfos(data: any) {
    data = data.map((x : any) => x.commit.author);

    let authors = Utils.groupBy<any>(data,'name');

    let counts = authors.map((x : any) => {
      let name : string = Object.keys(x)[0];
      return [x[name].length,name];
    })

    counts = counts.sort((x : any,y : any) => y[0] - x[0]);
    
    this.count_names = counts;
  }

  handleNewFilters(e : any) {
    let path = e.filter.params.path;
    let field = e.filter.params.type;
    let value = e.filter.value
    console.log(path,field,value)
    this.commitDataFiltered = this.rawCommitData
        .filter((data : any) => Utils.isLeftEqualsRight(value, Utils.getFieldFromObjectPath(path, data), field))
    this.updateInfos(this.commitDataFiltered);
  }

}
