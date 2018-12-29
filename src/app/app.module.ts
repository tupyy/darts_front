import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './containers/navigation/header/header.component';
import {SidenavListComponent} from './containers/navigation/sidenav-list/sidenav-list.component';
import {LayoutComponent} from './layout/layout.component';
import {HomeComponent} from './containers/home/home.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {GameFinishAnnounceComponent} from './game/components/game-finish-announce/game-finish-announce.component';
import {GameModule} from './game/game.module';

@NgModule({
    declarations: [
        AppComponent,
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
        NgbModule,
        GameModule
    ],
    entryComponents: [
        GameFinishAnnounceComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
