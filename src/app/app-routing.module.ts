import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PlayFormContainerComponent} from './containers/play-form-container/play-form-container.component';
import {NewGameComponent} from './containers/new-game/new-game.component';
import {HomeComponent} from './containers/home/home.component';

const appRoute: Routes = [
    {path: 'game', component: PlayFormContainerComponent},
    {path: 'new', component: NewGameComponent},
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
