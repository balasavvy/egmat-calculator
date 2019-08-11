import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateScoreComponent } from './calculate-score.component';

describe('CalculateScoreComponent', () => {
  let component: CalculateScoreComponent;
  let fixture: ComponentFixture<CalculateScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculateScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculateScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
