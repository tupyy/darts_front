import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySummaryComponent } from './play-summary.component';

describe('PlaySummaryComponent', () => {
  let component: PlaySummaryComponent;
  let fixture: ComponentFixture<PlaySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaySummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
