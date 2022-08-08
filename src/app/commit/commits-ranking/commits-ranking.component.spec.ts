import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsRankingComponent } from './commits-ranking.component';

describe('CommitsRankingComponent', () => {
  let component: CommitsRankingComponent;
  let fixture: ComponentFixture<CommitsRankingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsRankingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsRankingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
