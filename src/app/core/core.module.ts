import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthService} from './auth.service';
import {BackendService} from './backend.service';
import {LocalStorageService} from './local-storage.service';

@NgModule({
    providers: [AuthService, BackendService, LocalStorageService]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('Core module already imported.');
        }
    }
}
