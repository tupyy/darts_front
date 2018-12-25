import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayFormContainerComponent } from './play-form-container.component';

describe('PlayFormContainerComponent', () => {
  let component: PlayFormContainerComponent;
  let fixture: ComponentFixture<PlayFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayFormContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
