import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {PlayFormContainerComponent} from './containers/play-form-container/play-form-container.component';

const appRoute: Routes = [
    {path: 'game', component: PlayFormContainerComponent},
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
