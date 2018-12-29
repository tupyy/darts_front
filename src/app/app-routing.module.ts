import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {NewGameComponent} from './game/containers/new-game/new-game.component';
import {HomeComponent} from './containers/home/home.component';
import {GameViewComponent} from './game/containers/game-view/game-view.component';

const appRoute: Routes = [
    {path: 'new', component: NewGameComponent},
    {path: 'play', component: GameViewComponent},
    {path: '', component: HomeComponent}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoute,
            {enableTracing: true}
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
