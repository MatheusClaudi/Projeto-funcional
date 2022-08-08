import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DescriptionComponent } from './description/description.component';
import { CommitsTableComponent } from './commits-table/commits-table.component';
import { CommitsRankingComponent } from './commits-ranking/commits-ranking.component';
import { CommitsGraphComponent } from './commits-graph/commits-graph.component';
import { CommitsFeatureComponent } from './commits-feature/commits-feature.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedStateService } from './_services/shared-state.service';
import { FilterPainelComponent } from './filter-painel/filter-painel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPageComponent,
    NavigationComponent,
    DescriptionComponent,
    CommitsTableComponent,
    CommitsRankingComponent,
    CommitsGraphComponent,
    CommitsFeatureComponent,
    FilterPainelComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MainPageComponent
  ],
  providers: [
    SharedStateService
  ]
})
export class CommitModule { }
