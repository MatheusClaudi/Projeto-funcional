import { Component, OnInit } from '@angular/core';
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
    this.rawCommitData = data;
    this.commitDataFiltered = data;
    this.updateTable();
    this.resetPagination();
  }

  handleNewFilters(e: any) {
    console.log(e);
    if (e.filter) {
      let path = e.filter.params.path;
      let field = e.filter.params.type;
      let value = e.filter.value
      this.commitDataFiltered = this.rawCommitData
        .filter(data => Utils.isLeftEqualsRight(value, Utils.getFieldFromObjectPath(path, data), field))
      console.log(this.commitDataFiltered)
      this.resetPagination()
      this.updateTable()
    }
    if (e.order) {
      let path = e.order.params.path;  // caminho para a varíavel para se ordenar
      let field = e.order.params.type; // tipo do campo para se filtrar
      let value = e.order.value; // se value = -1 a ordem é decrescente, se for = 1 a ordem é crescente
      console.log(path, field, value)

      // para ordenar o valor abaixo recomendo utilizar a função Util.orderBy2 em conjunto com Utils.isLeftBiggerThanRight para definir a ordem crescente ou decrescente
      // this.commitDataFiltered = this.rawCommitData Você deve ordenar o valor de this.rawCommitData
      // this.resetPagination() quando fizer descomenta essa linha
      // this.updateTable() quando fizer descomenta essa linha
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
