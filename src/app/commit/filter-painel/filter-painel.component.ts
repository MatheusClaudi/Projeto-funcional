import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'

const FILTER_CONFIG = [
  { label: 'Nome autor', path: 'commit.author.name', type: 'string' },
  { label: 'Email autor', path: 'commit.author.email', type: 'string' },
  { label: 'Nome comitter', path: 'commit.committer.name', type: 'string' },
  { label: 'Data commit', path: 'commit.author.date', type: 'date' },
  { label: 'Quantidade comentários', path: 'commit.comment_count', type: 'number' }
];

@Component({
  selector: 'app-filter-painel',
  templateUrl: './filter-painel.component.html',
  styleUrls: ['./filter-painel.component.css']
})
export class FilterPainelComponent implements OnInit {

  @Input() public showfilter: boolean = false;
  @Input() public showSort: boolean = false;
  @Output() formData = new EventEmitter();


  public isSectionOpen = false;
  public filterOptions = FILTER_CONFIG;
  public filterForm = new FormGroup({
    filterColumn: new FormControl(''),
    filterField: new FormControl(''),
    sortColumn: new FormControl(''),
    order: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {}

  toogleSection() {
    this.isSectionOpen = !this.isSectionOpen;
  }

  onSubmit() {
    let curr = this.filterForm.value;
    let obj = {};
    if (curr.filterColumn !== '' && curr.filterField != '') {
      obj = {...obj, filter: { value: curr.filterField, params: this.filterOptions.find(d => d.label === curr.filterColumn)}}
    }
    if (curr.sortColumn !== '' && curr.order != '' && curr.order != '0') {
      obj = {...obj, order: { value: curr.order, params: this.filterOptions.find(d => d.label === curr.sortColumn)}}
    }
    this.formData.emit(obj);
  }
}
