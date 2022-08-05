import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantidadeCommitsComponent } from './quantidade-commits.component';

describe('QuantidadeCommitsComponent', () => {
  let component: QuantidadeCommitsComponent;
  let fixture: ComponentFixture<QuantidadeCommitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuantidadeCommitsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuantidadeCommitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
