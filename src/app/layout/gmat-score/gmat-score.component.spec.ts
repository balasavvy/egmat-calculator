import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GmatScoreComponent } from './gmat-score.component';

describe('GmatScoreComponent', () => {
  let component: GmatScoreComponent;
  let fixture: ComponentFixture<GmatScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmatScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmatScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
