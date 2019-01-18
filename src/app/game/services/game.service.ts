import {Injectable} from '@angular/core';
import {Game, Move, Player} from '../engine/game';
import {Observable, Subject} from 'rxjs';
import {StandardPlayer} from '../engine/standard-player';
import {GameType} from '../engine/game-type';
import {StandardGame} from '../engine/standard-game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;

    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    constructor() {
    }

    startGame(gameType: number, playersNames: string[]): void {
        if (gameType === GameType.Standard) {
            const players = [];
            for (let i = 0; i < playersNames.length; i++) {
                players.push(new StandardPlayer(i, playersNames[i]));
            }
            this.currentGame = new StandardGame(players);

            this.currentGame.isFinished().subscribe(val => {
                this.finishAnnounceSource.next(val);
            });
        }

    }

    hasGame(): boolean {
        return this.currentGame !== undefined;
    }

    getCurrentMove(): Observable<Move> {
        return this.currentGame.getCurrentMove();
    }

    getCurrentPlayer(): Observable<Player> {
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
