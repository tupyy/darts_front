import {Injectable} from '@angular/core';
import {HttpGameStorageService, LocalGameStorage} from '@app/core/game-storage';
import {Game} from '@app/engine/game';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameStorageService {

    private currentGame: Game;

    constructor(private localStorage: LocalGameStorage,
                private httpStorate: HttpGameStorageService) {
    }

    public setGame(game: Observable<Game>) {
        game.subscribe(_game => {
            if (_game) {
                this.currentGame = _game;
                _game.getCurrentMove().subscribe(move => {
                    this.saveCurrentGame();
                });
            }
        });
    }

    /**
     * Save the current game. If the user is logged in the game will be saved on server and local storage.
     * Otherwise it will stored only on the local storage
     */
    private saveCurrentGame() {
        this.localStorage.saveGame(this.currentGame);
    }

    /**
     * Delete the current game from local storage only
     */
    private deleteCurrentGame() {
        this.localStorage.deleteGame();
    }
}
