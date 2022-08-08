import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsGraphComponent } from './commits-graph.component';

describe('CommitsGraphComponent', () => {
  let component: CommitsGraphComponent;
  let fixture: ComponentFixture<CommitsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
