import {NgModule} from '@angular/core';


import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule, MatListModule, MatMenuModule, MatSidenavModule, MatTabsModule} from '@angular/material';

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
        MatMenuModule
    ]
})

export class MaterialModule {}
