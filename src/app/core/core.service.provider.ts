import {AuthService} from 'app/core';
import {CoreService} from 'app/core/core.service';
import {GameStorageService} from '@app/core/game-storage/game-storage.service';

const coreServiceFactory = (gameStorageService: GameStorageService, authService: AuthService) => {
    return new CoreService(gameStorageService, authService.authenticationObservable);
};

export let coreServiceProvider = {
    provide: CoreService,
    useFactory: coreServiceFactory,
    deps: [GameStorageService, AuthService]
};
