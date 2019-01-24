import {AuthService} from 'app/core';
import {CoreService} from 'app/core/core.service';
import {HttpGameStorageService, LocalGameStorage} from 'app/core/game-storage';

const coreServiceFactory = (localStorage: LocalGameStorage, httpStorage: HttpGameStorageService, authService: AuthService) => {
    return new CoreService(localStorage, httpStorage, authService.isAuthenticated);
};

export let coreServiceProvider = {
    provide: CoreService,
    useFactory: coreServiceFactory,
    deps: [LocalGameStorage, HttpGameStorageService, AuthService]
};
