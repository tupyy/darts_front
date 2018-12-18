import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameViewComponent} from './game-view/game-view.component';
import {RouterModule, Routes} from '@angular/router';

const appRoute: Routes = [
    {path: 'game', component: GameViewComponent},
    {path: '', redirectTo: '/game', pathMatch: 'full'}
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
