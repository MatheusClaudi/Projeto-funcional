import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommitsFeatureComponent } from './commits-feature/commits-feature.component';
import { CommitsGraphComponent } from './commits-graph/commits-graph.component';
import { CommitsRankingComponent } from './commits-ranking/commits-ranking.component';
import { CommitsTableComponent } from './commits-table/commits-table.component';
import { DescriptionComponent } from './description/description.component';

const routes: Routes = [
  {
    path: '',
    component: DescriptionComponent
  },
  {
    path: 'description',
    component: DescriptionComponent
  },
  {
    path: 'table',
    component: CommitsTableComponent
  },
  {
    path: 'ranking',
    component: CommitsRankingComponent
  },
  {
    path: 'graph',
    component: CommitsGraphComponent,
  },
  {
    path: 'feature',
    component: CommitsFeatureComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
