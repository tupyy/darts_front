import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Game} from '@app/engine/game';
import {GameType, StandardGame, StandardPlayer} from '@app/engine/index';
import {GameStorageService} from '@app/core/game-storage/game-storage.service';
import {Standard501Game} from '@app/engine/standard-501-game';

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
        const players = [];
        for (let i = 0; i < playersNames.length; i++) {
            players.push(new StandardPlayer(i, playersNames[i]));
        }

        let newGame: Game;
        switch (gameType) {
            case(GameType.Standard_301): {
                newGame = new StandardGame(players);
                break;
            }
            case (GameType.Standard_501): {
                newGame = new Standard501Game(players);
                break;
            }
        }
        this.currentGameID = newGame.id;
        this.currentGame.next(newGame);
        this.games.push(newGame);
        this.gameStorageService.setGame(this.getCurrentGame());
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
