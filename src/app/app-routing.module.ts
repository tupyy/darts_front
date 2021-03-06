import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './views/home/home.component';

const appRoute: Routes = [
    {path: '', component: HomeComponent},
    {path: '*', redirectTo: '/'}
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        RouterModule.forRoot(
            appRoute
        )
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
