import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {PlayFormComponent} from './components/play-form/play-form.component';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {GameRankingComponent} from './containers/game-ranking/game-ranking.component';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {GameViewComponent} from './containers/game-view/game-view.component';
import {GameFinishAnnounceComponent} from './components/game-finish-announce/game-finish-announce.component';
import {GameMovesComponent} from './containers/game-moves/game-moves.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import { GameComponent } from './game/game.component';

@NgModule({
    declarations: [
        PlayFormComponent,
        ShootComponent,
        GameRankingComponent,
        NewGameComponent,
        GameViewComponent,
        GameRankingComponent,
        GameFinishAnnounceComponent,
        GameMovesComponent,
        GameComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        GameRoutingModule
    ],
    entryComponents: [
        GameFinishAnnounceComponent
    ],
})
export class GameModule {
}
