import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from 'ngx-webstorage-service';
import {Game} from '@app/engine/game';
import {UserToken} from '@app/engine/user';

const STORAGE_KEY = 'my-awesome-game';
const USER_TOKEN_KEY = 'user_token';

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

    public saveToken(userToken: UserToken) {
        this.localStorage.set(USER_TOKEN_KEY, userToken);
    }

    public getToken(): UserToken {
        return this.localStorage.get(USER_TOKEN_KEY);
    }

    public removeToken() {
        return this.localStorage.remove(USER_TOKEN_KEY);
    }
}
