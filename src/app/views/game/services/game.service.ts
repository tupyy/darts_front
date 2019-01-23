import {Injectable, OnDestroy} from '@angular/core';
import {Game, Move, Player} from '../../../model/engine/game';
import {Subject, Subscription} from 'rxjs';
// @ts-ignore
import {StandardPlayer} from '@app/engine/standard-player';
// @ts-ignore
import {GameType} from '@app/engine/game-type';
// @ts-ignore
import {StandardGame} from '@app/engine/standard-game';
// @ts-ignore
import {StandardMove} from '@app/engine/standard-move';
import {LocalStorageService} from '@app/core/local-storage.service';


@Injectable({
    providedIn: 'root'
})
export class GameService implements OnDestroy {

    private currentGame: Game;
    private currentMove: Move;
    private currentMove$: Subscription;
    private currentPlayer: Player;

    private finishSubscription: Subscription;
    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    constructor(private localStorage: LocalStorageService) {
    }

    ngOnDestroy(): void {
        this.unsubscribe();
        this.localStorage.deleteGame();
        this.currentGame = null;
    }

    startGame(gameType: number, playersNames: string[]): void {
        if (gameType === GameType.Standard) {
            const players = [];
            for (let i = 0; i < playersNames.length; i++) {
                players.push(new StandardPlayer(i, playersNames[i]));
            }
            this.currentGame = new StandardGame(players);
            this.subscribeTo(this.currentGame);
        }

    }

    hasGame(): boolean {
        return this.localStorage.hasGame();
    }

    getCurrentMove(): Move {
        return this.currentMove;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    next() {
        this.currentGame.next();
    }

    getRankingList(): Player[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getRankings();
        }
        return null;
    }

    getMoves(): Move[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getMoves();
        }
        return null;
    }

    // restore the game from local storage
    restore() {
        this.unsubscribe();
        const gameJSON = JSON.parse(this.localStorage.loadGame());
        if (gameJSON.gameType === GameType.Standard) {
            this.currentGame = StandardGame.fromJSON(gameJSON);
            this.subscribeTo(this.currentGame);
        }
    }

    private subscribeTo(game: Game) {
        this.currentMove$ = game.getCurrentMove().subscribe(move => {
            if (game instanceof StandardGame) {
                this.currentMove = <StandardMove>move;
            }
            this.currentPlayer = game.getPlayer(this.currentMove.playerId);
            this.localStorage.saveGame(this.currentGame);
        });
        this.finishSubscription = game.isFinished().subscribe(val => {
            // game is finished, delete it from storage
            this.localStorage.deleteGame();
            this.finishAnnounceSource.next(val);
        });
    }

    private unsubscribe() {
        if (this.currentMove$ !== undefined) {
            this.currentMove$.unsubscribe();
        }
        if (this.finishSubscription !== undefined) {
            this.finishSubscription.unsubscribe();
        }
    }
}