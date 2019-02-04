import {NgModule} from '@angular/core';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatChipsModule,
    MatRadioModule
} from '@angular/material';

@NgModule({
    exports: [MatToolbarModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
        MatListModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatDialogModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatChipsModule,
        MatRadioModule
    ]
})

export class MaterialModule {
}
