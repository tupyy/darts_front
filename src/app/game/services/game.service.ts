import {Injectable} from '@angular/core';
import {Game, Move, Player, StandardGame} from './index';
import {Observable, Subject} from 'rxjs';
import {StandardPlayer} from './player';
import {GameTypeEnum} from './GameTypeEnum';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;

    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    private currentMove$ = new Subject<Move>();

    constructor() {
    }

    startGame(gameType: number, playersNames: string[]): void {
        if (gameType === GameTypeEnum.Standard) {
            const players = [];
            for (let i = 0; i < playersNames.length; i++) {
                players.push(new StandardPlayer(i, playersNames[i]));
            }
            this.currentGame = new StandardGame(players);
            this.currentMove$.next(this.currentGame.getCurrentMove());

            this.currentGame.isFinished().subscribe(val => {
                this.finishAnnounceSource.next(val);
            });
        }

    }

    getCurrentGame() {
        return this.currentGame;
    }

    getCurrentMove(): Move {
        return this.currentGame.getCurrentMove();
    }

    getCurrentPlayer(): Player {
        return this.currentGame.getCurrentPlayer();
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
}
