import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsTableComponent } from './commits-table.component';

describe('CommitsTableComponent', () => {
  let component: CommitsTableComponent;
  let fixture: ComponentFixture<CommitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
