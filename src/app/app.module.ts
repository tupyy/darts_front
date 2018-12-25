import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MaterialModule} from './material.module';
import { PlayFormContainerComponent } from './containers/play-form-container/play-form-container.component';
import {ShootComponent} from './components/shoot-component/shoot.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PlaySummaryComponent } from './containers/play-summary/play-summary.component';
import { NewGameComponent } from './containers/new-game/new-game.component';

@NgModule({
    declarations: [
        AppComponent,
        PlayFormContainerComponent,
        ShootComponent,
        PlaySummaryComponent,
        NewGameComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
