import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameClassamentComponent } from './game-classament.component';

describe('GameClassamentComponent', () => {
  let component: GameClassamentComponent;
  let fixture: ComponentFixture<GameClassamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameClassamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameClassamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
