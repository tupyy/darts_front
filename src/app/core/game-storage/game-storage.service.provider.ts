import {AuthService} from 'app/core';
import {GameStorageService} from '@app/core/game-storage/game-storage.service';
import {HttpGameStorageService, LocalGameStorage} from '@app/core/game-storage';

const gameStorageServiceFactory = (localStorage: LocalGameStorage,
                                   httpStorage: HttpGameStorageService,
                                   authService: AuthService) => {
    return new GameStorageService(localStorage, httpStorage, authService);
};

export let gameStorageServiceProvider = {
    provide: GameStorageService,
    useFactory: gameStorageServiceFactory,
    deps: [LocalGameStorage, HttpGameStorageService, AuthService]
};
