import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICommit } from 'src/app/_dataModels/commit';
import Utils from 'src/_util/util';
import { SharedStateService } from '../_services/shared-state.service';

class LineDataNode {
  name: string;
  value: string;

  constructor(name: string, value: string) {
    this.name = name;
    this.value = value;
  }
}

class LineData {
  name: string;
  series: any;
  len: number;

  constructor(name: string, series: any) {
    this.name = name;
    this.series = series;
    this.len = series.length;
  }
}

@Component({
  selector: 'app-commits-feature',
  templateUrl: './commits-feature.component.html',
  styleUrls: ['./commits-feature.component.css']
})
export class CommitsFeatureComponent implements OnInit {

  rawCommitData: ICommit[] = [];
  lineData: any = [];

  constructor(
    private stateService: SharedStateService
  ) {
    this.stateService.rawCommits.subscribe(
      (data) => {
        this.handleNewRawData(data)
      });
  }

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Número de commits X Tempo');
    this.stateService.getCommitsFromAPI();
  }

  handleNewRawData(data: Array<ICommit>) {
    this.rawCommitData = data;
    this.updateLineCharts(this.rawCommitData);
  }

  async groupRawDataByEmail(rawData: ICommit[]) {
    return Utils.groupBy2(rawData, "commit.author.email");
  }

  orderLineDataByNumberOfDates(lineData: any) {
    return Utils.orderBy2(lineData, "0.len", Utils.isLeftLowerOrEqualRight, 'number');
  }

  getFormatedAndSortedDatesByGroup(data: ICommit[]) {
    const datesFromGroup = data.map(
      (data: ICommit) => {
        return {
          date: moment(
            data.commit.author.date.split('T')[0], 
            'YYYY-MM-DD'
            ).format('DD/MM/YYYY')
        }
      })
    return Utils.orderBy2(datesFromGroup, 'date', Utils.isLeftBiggerThanRight, 'date');
  }

  getNodeLineDataFromGroupedDates(groupedDates: any) {
    return groupedDates
      .reduce((acc: any, data: any) => {
        const date = Object.keys(data)[0];
        return [...acc, new LineDataNode(date, data[date].length)]
      }, [])
  }

  async updateLineCharts(rawCommits: any) {
    const dataGroupedUserEmail = await this.groupRawDataByEmail(rawCommits);
    const lineData = dataGroupedUserEmail.reduce(
      (mainAcc: any, data: any) => {
        const userEmailKey = Object.keys(data)[0];
        const formatedDates = this.getFormatedAndSortedDatesByGroup(data[userEmailKey]);
        const agrupedByDate = Utils.groupBy(formatedDates, "date");
        const chartNodes = this.getNodeLineDataFromGroupedDates(agrupedByDate);
      return [...mainAcc, [new LineData(userEmailKey, chartNodes)]]
    }, [])

    this.lineData = this.orderLineDataByNumberOfDates(lineData);
  }
}
