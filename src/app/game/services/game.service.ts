import {Injectable} from '@angular/core';
import {Game, Move, Player, StandardGame} from './index';
import {Observable, Subject} from 'rxjs';
import {StandardPlayer} from './player';

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

    startGame(playersNames: string[]): void {
        const players: StandardPlayer[] = [];
        playersNames.forEach((name, index) => {
            players.push(new StandardPlayer(index, name));
        });
        this.currentGame = new StandardGame(players);
        this.currentGame.isFinished().subscribe(val => {
            this.finishAnnounceSource.next(val);
        });
    }

    getCurrentGame() {
        return this.currentGame;
    }

    getCurrentMove(): Observable<Move> {
        return this.currentMove$;
    }

    next() {
        this.currentMove$.next(this.currentGame.next());
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
