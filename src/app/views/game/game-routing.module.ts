import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {GameViewComponent} from './containers/game-view/game-view.component';
import {MainGameComponent} from './main-component/main-game.component';
import {PlayGuard} from './play.guard';

const routes: Routes = [
    {
        path: 'game',
        component: MainGameComponent,
        children: [
            {path: 'new', component: NewGameComponent},
            {path: 'play', component: GameViewComponent, canActivate: [PlayGuard]},
            {path: 'play/:action', component: GameViewComponent, canActivate: [PlayGuard]}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GameRoutingModule {
}
