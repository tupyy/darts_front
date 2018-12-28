import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameFinishAnnounceComponent } from './game-finish-announce.component';

describe('GameFinishAnnounceComponent', () => {
  let component: GameFinishAnnounceComponent;
  let fixture: ComponentFixture<GameFinishAnnounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameFinishAnnounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameFinishAnnounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
