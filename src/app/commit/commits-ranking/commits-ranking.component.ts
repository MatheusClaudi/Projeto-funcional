import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';
import Utils from "../../../_util/util"
import * as moment from 'moment';
import { ICommit } from 'src/app/_dataModels/commit';

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
    this.stateService.rawCommits.subscribe((data: ICommit[]) => {
      const formatedData = this.formatRawData(data) 
      this.updateInfos(formatedData);
      this.rawCommitData = formatedData;
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
    if (e.filter) {
      let path = e.filter.params.path;
      let field = e.filter.params.type;
      let value = e.filter.value
      console.log(path,field,value)
      this.commitDataFiltered = this.rawCommitData
          .filter((data : any) => Utils.isLeftEqualsRight(value, Utils.getFieldFromObjectPath(path, data), field))
      this.updateInfos(this.commitDataFiltered);
    }
    else {
      this.commitDataFiltered = this.rawCommitData;
      this.updateInfos(this.commitDataFiltered);
    }
  }

  formatRawData(rawData: ICommit[]) {
    return rawData.reduce( 
      (prev: any, curr: ICommit) => 
        [...prev, 
          {...curr, commit: 
            {...curr.commit, author: 
              {...curr.commit.author, 
                date: this.formatDateValueToBr(curr.commit.author.date)
              }}}]
      , [])
  }

  formatDateValueToBr(d: any) {
    return moment(
      d.split('T')[0], 
      'YYYY-MM-DD'
      ).format('DD/MM/YYYY')
  }
}
