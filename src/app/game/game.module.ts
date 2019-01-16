import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {StandardPlayFormComponent} from './components/standard-play-form/standard-play-form.component';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {GameRankingComponent} from './containers/game-ranking/game-ranking.component';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {GameViewComponent} from './containers/game-view/game-view.component';
import {GameFinishAnnounceComponent} from './components/game-finish-announce/game-finish-announce.component';
import {StandardGameMovesComponent} from './containers/standard-game-moves/standard-game-moves.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import { MainGameComponent } from './main-component/main-game.component';
import {PlayComponentDirective} from './directives/play-component.directive';

@NgModule({
    declarations: [
        StandardPlayFormComponent,
        ShootComponent,
        GameRankingComponent,
        NewGameComponent,
        GameViewComponent,
        GameRankingComponent,
        GameFinishAnnounceComponent,
        StandardGameMovesComponent,
        MainGameComponent,
        PlayComponentDirective
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
