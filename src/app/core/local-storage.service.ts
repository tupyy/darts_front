import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Game} from '@app/engine/game';

const STORAGE_KEY = 'my-awesome-game';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor(@Inject(LOCAL_STORAGE) private localStorage: StorageService) {
    }

    public saveGame(game: Game) {
        this.localStorage.set(STORAGE_KEY, JSON.stringify(game));
    }

    public loadGame(): string {
        return this.localStorage.get(STORAGE_KEY);
    }
    public hasGame(): boolean {
        return this.localStorage.has(STORAGE_KEY);
    }

    public deleteGame() {
        this.localStorage.remove(STORAGE_KEY);
    }
}
