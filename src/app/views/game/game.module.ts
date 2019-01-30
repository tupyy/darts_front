import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {StandardPlayComponent} from './components/standard-play-component/standard-play.component';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {GameRankingComponent} from './components/game-ranking/game-ranking.component';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {GameViewComponent} from './containers/game-view/game-view.component';
import {GameFinishAnnounceComponent} from './components/game-finish-announce/game-finish-announce.component';
import {StandardGameMovesComponent} from './components/standard-game-moves/standard-game-moves.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import { MainGameComponent } from './main-component/main-game.component';
import {PlayComponentDirective} from './directives/play-component.directive';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {GameService} from './services/game.service';
import {BoardComponent} from './components/board/board.component';
import {BoardSliceComponent} from './components/board/board-slice/board-slice.component';

@NgModule({
    declarations: [
        StandardPlayComponent,
        ShootComponent,
        GameRankingComponent,
        NewGameComponent,
        GameViewComponent,
        GameRankingComponent,
        GameFinishAnnounceComponent,
        StandardGameMovesComponent,
        MainGameComponent,
        BoardComponent,
        BoardSliceComponent,
        PlayComponentDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        GameRoutingModule,
        StorageServiceModule
    ],
    providers: [GameService],
    entryComponents: [
        GameFinishAnnounceComponent,
        StandardPlayComponent
    ],
})
export class GameModule {
}
