import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './containers/home/home.component';

const appRoute: Routes = [
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
