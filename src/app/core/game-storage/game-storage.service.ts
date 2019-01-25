import {Injectable} from '@angular/core';
import {HttpGameStorageService, LocalGameStorage} from '@app/core/game-storage';
import {Game} from '@app/engine/game';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '@app/core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class GameStorageService {

    private currentGame: Game;
    private currentGameSubscription: Subscription;

    constructor(private localStorage: LocalGameStorage,
                private httpStorage: HttpGameStorageService,
                private authService: AuthService) {
    }

    public setGame(game: Observable<Game>) {
        this.unsubscribeFrom(this.currentGameSubscription);
        this.currentGameSubscription = this.subscribeTo(game);
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

    private unsubscribeFrom(gameSubscription: Subscription) {
        if (gameSubscription) {
            gameSubscription.unsubscribe();
        }
    }

    private subscribeTo(game: Observable<Game>) {
        return game.subscribe(_game => {
            if (_game) {
                this.currentGame = _game;
                _game.getCurrentMove().subscribe(move => {
                    this.saveCurrentGame();
                    if (this.authService.isAuthenticated()) {
                        console.log('userauthenticated');
                    }
                });
            }
        });
    }
}
