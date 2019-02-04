import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './views/navigation/header/header.component';
import {SidenavListComponent} from './views/navigation/sidenav-list/sidenav-list.component';
import {LayoutComponent} from './views/layout/layout.component';
import {HomeComponent} from './views/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GameModule} from './views/game/game.module';
import {LoginComponent} from './views/login/login.component';
import {CoreModule} from './core/core.module';
import {HttpClientModule} from '@angular/common/http';
import {coreServiceProvider} from '@app/core/core.service.provider';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        SidenavListComponent,
        LayoutComponent,
        HomeComponent,
        LoginComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        HttpClientModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgbModule,
        GameModule,
        AppRoutingModule,
        CoreModule,
    ],
    providers: [coreServiceProvider],
    bootstrap: [AppComponent]
})
export class AppModule {
}
