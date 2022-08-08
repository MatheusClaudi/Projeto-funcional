import { Component, OnInit } from '@angular/core';
import { SharedStateService } from '../_services/shared-state.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {

  constructor(
    private stateService: SharedStateService
  ) {}

  ngOnInit(): void {
    this.stateService.updateCurrentSection('Descrição de commits')
  }

}
