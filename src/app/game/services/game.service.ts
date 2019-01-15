import {Injectable} from '@angular/core';
import {Game, Move, Player, StandardGame} from './index';
import {LoggerService} from './logger.service';
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
            return this.currentGame.players.sort((player1, player2) => {
                if (player1.getScore() > player2.getScore()) {
                    return 1;
                }

                if (player1.getScore() < player2.getScore()) {
                    return -1;
                }

                return 0;
            });
        }

        return null;
    }

    getMoves(): Move[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getMoves().sort((move1, move2) => {
                if (move1.id > move2.id) {
                    return 1;
                }

                if (move1.id < move2.id) {
                    return -1;
                }

                return 0;
            });
        }

        return null;
    }
}
