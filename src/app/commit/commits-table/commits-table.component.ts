import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ICommit } from 'src/app/_dataModels/commit';
import { CommitTableData } from 'src/app/_dataModels/tableCommitData';
import Utils from 'src/_util/util';
import { SharedStateService } from '../_services/shared-state.service';

const ITENS_PER_PAGE = 4;
const TABLE_COLUMNS = [
  { label: 'Autor', key: 'author' },
  { label: 'Email autor', key: 'authorEmail' },
  { label: 'Email commiter', key: 'commiterEmail' },
  { label: 'Data', key: 'date' },
  { label: 'Qtd comentários', key: 'qtd_comments' }, 
  { label: 'Verificado', key: 'verify' }
];

@Component({
  selector: 'app-commits-table',
  templateUrl: './commits-table.component.html',
  styleUrls: ['./commits-table.component.css']
})
export class CommitsTableComponent implements OnInit {

  public tableColumns = TABLE_COLUMNS;
  public rawCommitData: Array<ICommit> = [];
  public commitDataFiltered: Array<ICommit> = [];
  public tableData: Array<CommitTableData> = [];
  public currentPage = 1;
  public totalPages = 1;

  constructor(
    private stateService: SharedStateService
  ) {
    this.stateService.rawCommits.subscribe((data) => {this.handleNewRawData(data)});
  }

  ngOnInit(): void {
    this.stateService.getCommitsFromAPI();
    this.stateService.updateCurrentSection('Listagem e filtragem de commits');
  }

  handleNewRawData(data: Array<ICommit>) {
    const dataFormated = this.formatRawData(data);
    this.rawCommitData = dataFormated;
    this.commitDataFiltered = dataFormated;
    this.updateTable();
    this.resetPagination();
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

  handleNewFilters(e: any) {
    this.handleFilters(e);
  }

  handleFilters(e: any) {
    if (e.filter) {
      let path = e.filter.params.path;
      let field = e.filter.params.type;
      let value = e.filter.value
      this.commitDataFiltered = this.rawCommitData
        .filter(data => Utils.isLeftEqualsRight(value, Utils.getFieldFromObjectPath(path, data), field))
      this.handleOrdenation(e, this.commitDataFiltered);
    }
    else if (!e.order && !e.filter) {
      this.commitDataFiltered = this.rawCommitData;
      this.resetPagination();
      this.updateTable();
    }
    else {
      this.handleOrdenation(e, this.rawCommitData);
    }
  }

  handleOrdenation(e: any, data: any) {
    if (e.order) {
      let path = e.order.params.path;
      let field = e.order.params.type;
      let value = e.order.value;
      const func = value == 1 ? Utils.isLeftBiggerThanRight: Utils.isLeftLowerOrEqualRight;
      this.commitDataFiltered = Utils.orderBy2(data, path, func, field);
      this.resetPagination();
      this.updateTable();
    }
    else {
      this.resetPagination();
      this.updateTable();
    }
  }

  updateTable() {
    this.tableData = this.commitDataFiltered
      .filter((_, index) => this.isRowOnPage(index))
      .map((data) => new CommitTableData(data));
  }

  isRowOnPage(index: number) {
    let min = ITENS_PER_PAGE * (this.currentPage - 1);
    let max = (ITENS_PER_PAGE * this.currentPage) - 1;
    return index >= min && index <= max
  }

  resetPagination() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.commitDataFiltered.length / ITENS_PER_PAGE);
  }

  getObjectAtribute(object:any , key:any) {
    return object[key];
  }

  previousPage() {
    if (this.currentPage != 1) {
      this.currentPage = this.currentPage - 1;
      this.updateTable();
    }
  }

  nextPage() {
    if (this.currentPage != this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.updateTable();
    }
  }
}
