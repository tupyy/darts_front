import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '@app/engine/game';
import {GameType, StandardGame, StandardPlayer} from '@app/engine/index';
import {GameStorageService} from '@app/core/game-storage/game-storage.service';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    private userLoggedIn: boolean;
    private games: Game[] = [];
    private currentGameID: string;

    private currentGame = new BehaviorSubject<Game>(null);

    constructor(private gameStorageService: GameStorageService,
                private isAuthorized: Observable<boolean>) {

        this.isAuthorized.subscribe(val => {
            this.userLoggedIn = val;
        });
    }

    public createGame(gameType: GameType, playersNames: string[]) {
        if (gameType === GameType.Standard) {
            const players = [];
            for (let i = 0; i < playersNames.length; i++) {
                players.push(new StandardPlayer(i, playersNames[i]));
            }
            const newGame = new StandardGame(players);
            this.currentGameID = newGame.id;
            this.currentGame.next(newGame);
            this.games.push(newGame);
            this.gameStorageService.setGame(this.getCurrentGame());
        }
    }

    public getCurrentGame(): Observable<Game> {
        return this.currentGame.asObservable();
    }

    public canRestoreGame(): boolean {
        return this.gameStorageService.canRestore();
    }

    private getGameById(id: string): Game {
        let currentGame = null;
        this.games.forEach(game => {
            if (game.id === id) {
                currentGame = game;
            }
        });
        return currentGame;
    }
}
