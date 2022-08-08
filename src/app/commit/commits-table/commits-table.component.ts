import { Component, OnInit } from '@angular/core';
import { ICommit } from 'src/app/_dataModels/commit';
import { CommitTableData } from 'src/app/_dataModels/tableCommitData';
import { SharedStateService } from '../_services/shared-state.service';

const ITENS_PER_PAGE = 4

@Component({
  selector: 'app-commits-table',
  templateUrl: './commits-table.component.html',
  styleUrls: ['./commits-table.component.css']
})
export class CommitsTableComponent implements OnInit {

  public tableColumns = [
    { label: 'Autor', key: 'author' },
    { label: 'Email autor', key: 'authorEmail' },
    { label: 'Email commiter', key: 'commiterEmail' },
    { label: 'Data', key: 'date' },
    { label: 'Qtd comentários', key: 'qtd_comments' }, 
    { label: 'Verificado', key: 'verify' }
  ];
  public rawCommitData: Array<ICommit> = [];
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

  updateTable() {
    this.tableData = this.rawCommitData
      .filter((_, index) => this.isRowOnPage(index))
      .map((data) => new CommitTableData(data));
  }

  getObjectAtribute(object:any , key:any) {
    return object[key];
  }

  isRowOnPage(index: number) {
    let min = ITENS_PER_PAGE * (this.currentPage - 1);
    let max = (ITENS_PER_PAGE * this.currentPage) - 1;
    return index >= min && index <= max
  }

  handleNewRawData(data: Array<ICommit>) {
    this.rawCommitData = data;
    this.updateTable();
    this.totalPages = Math.ceil(data.length / ITENS_PER_PAGE);
  }

  handleNewFilters(e: any) {
    console.log(e);
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
