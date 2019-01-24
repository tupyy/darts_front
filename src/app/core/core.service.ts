import {Injectable} from '@angular/core';
import {HttpGameStorageService, LocalGameStorage} from '@app/core/game-storage';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Game, Player} from '@app/engine/game';
import {GameType, StandardGame, StandardPlayer} from '@app/engine/index';

@Injectable({
    providedIn: 'root'
})
export class CoreService {

    private userLoggedIn: boolean;
    private games: Game[] = [];
    private currentGameID: string;

    private currentGame = new BehaviorSubject<Game>(null);

    constructor(private localStorage: LocalGameStorage,
                private httpStorage: HttpGameStorageService,
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
        }
    }

    public getCurrentGame(): Observable<Game> {
        return this.currentGame.asObservable();
    }

    public saveGame(game: Game) {
        this.localStorage.saveGame(game);
    }

    public deleteGame(game: Game) {
        this.localStorage.deleteGame();
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
