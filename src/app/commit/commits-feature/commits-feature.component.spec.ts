import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitsFeatureComponent } from './commits-feature.component';

describe('CommitsFeatureComponent', () => {
  let component: CommitsFeatureComponent;
  let fixture: ComponentFixture<CommitsFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitsFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitsFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
