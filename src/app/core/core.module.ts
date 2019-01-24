import {NgModule, Optional, SkipSelf} from '@angular/core';
import {AuthService} from './auth.service';
import {BackendService} from './backend.service';
import {LocalStorageService} from './local-storage.service';
import {httpInterceptorProviders} from './http-interceptors';
import {CoreService} from '@app/core/core.service';

@NgModule({
    providers: [
        AuthService,
        BackendService,
        LocalStorageService,
        CoreService,
        httpInterceptorProviders
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() core: CoreModule) {
        if (core) {
            throw new Error('Core module already imported.');
        }
    }
}
