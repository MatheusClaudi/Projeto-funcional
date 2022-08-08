import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, AfterViewChecked {

  public currentSection: string = '';

  constructor(
    private stateService: SharedStateService,
    private cdr: ChangeDetectorRef
  ) {
    this.stateService.currentSection.subscribe(section => this.currentSection = section);
  }

  ngOnInit(): void {}

  ngAfterViewChecked(){
    this.cdr.detectChanges();
 }
}
