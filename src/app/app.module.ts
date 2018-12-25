import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from './material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PlayFormContainerComponent } from './containers/play-form-container/play-form-container.component';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlaySummaryComponent } from './containers/play-summary/play-summary.component';
import { NewGameComponent } from './containers/new-game/new-game.component';
import { HeaderComponent } from './containers/navigation/header/header.component';
import { SidenavListComponent } from './containers/navigation/sidenav-list/sidenav-list.component';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './containers/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
    declarations: [
        AppComponent,
        PlayFormContainerComponent,
        ShootComponent,
        PlaySummaryComponent,
        NewGameComponent,
        HeaderComponent,
        SidenavListComponent,
        LayoutComponent,
        HomeComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FlexLayoutModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        NgbModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
