import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms'


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
  public filterForm = new FormGroup({
    filterColumn: new FormControl(''),
    filterField: new FormControl(''),
    sortColumn: new FormControl(''),
    order: new FormControl('')
  });

  constructor() { }

  ngOnInit(): void {}

  toogleSection() {
    this.isSectionOpen = !this.isSectionOpen
  }

  onSubmit() {
    this.formData.emit(this.filterForm.value)
  }
}
