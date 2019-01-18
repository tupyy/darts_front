import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'angular-webstorage-service';
import {Game} from '../engine/game';
import {StandardGame} from '../engine/standard-game';

const STORAGE_KEY = 'my-awesome-game';

@Injectable({
    providedIn: 'root'
})
export class GameStorageService {

    constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {
    }

    public saveGame(game: Game) {
        this.localStorage.set(STORAGE_KEY, JSON.stringify(game));
        console.log(JSON.stringify(game));
    }

    public hasGame(): boolean {
        return this.localStorage.get(STORAGE_KEY) !== null;
    }

    public deleteGame() {
        this.localStorage.remove(STORAGE_KEY);
    }
}
