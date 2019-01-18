import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './containers/home/home.component';
import {LoginComponent} from './login/login.component';

const appRoute: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent}
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
