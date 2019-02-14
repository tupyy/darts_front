import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GameRoutingModule} from './game-routing.module';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {GameRankingComponent} from './components/game-ranking/game-ranking.component';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {GameViewComponent} from './containers/game-view/game-view.component';
import {GameFinishAnnounceComponent} from './components/game-finish-announce/game-finish-announce.component';
import {StandardGameMovesComponent} from './components/standard-game-moves/standard-game-moves.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../material.module';
import {MainGameComponent} from './main-component/main-game.component';
import {BoardComponentDirective} from './directives/board-component.directive';
import {StorageServiceModule} from 'ngx-webstorage-service';
import {GameService} from './services/game.service';
import {BoardSliceComponent} from './components/board/board-slice.component';
import {FullBoardComponent} from './components/board/full-board.component';
import {PlayerNameComponent} from './components/player-name/player-name.component';
import {StandardPlayBoardComponent} from './components/standard-play-board/standard-play-board.component';
import {ReducedBoardComponent} from './components/board/reduced-board.component';
import {PlayComponentDirective} from './directives/play-component.directive';
import {BoardBulleyeComponent} from './components/board/board-bulleye.component';
import {GameTypeDescriptionComponent} from './components/game-type-description/game-type-description.component';

@NgModule({
    declarations: [
        ShootComponent,
        GameRankingComponent,
        NewGameComponent,
        GameViewComponent,
        GameRankingComponent,
        GameFinishAnnounceComponent,
        StandardGameMovesComponent,
        MainGameComponent,
        FullBoardComponent,
        BoardSliceComponent,
        BoardBulleyeComponent,
        BoardComponentDirective,
        PlayComponentDirective,
        PlayerNameComponent,
        StandardPlayBoardComponent,
        ReducedBoardComponent,
        GameTypeDescriptionComponent
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
        StandardPlayBoardComponent,
        FullBoardComponent,
        ReducedBoardComponent
    ],
})
export class GameModule {
}
