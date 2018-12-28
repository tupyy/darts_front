import {Injectable} from '@angular/core';
import {Game, Move, Player} from '../game';
import {LoggerService} from '../services/logger.service';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;

    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    constructor(private logger: LoggerService) {
    }

    startGame(playersNames: string[]): void {
        const players: Player[] = [];
        playersNames.forEach((name, index) => {
            players.push(new Player(index, name));
        });
        this.currentGame = new Game(players);
        this.currentGame.finishAnnouced$.subscribe(val => {
            this.finishAnnounceSource.next(true);
        });
    }

    getCurrentGame() {
        return this.currentGame;
    }

    getCurrentMove(): Move {
        return this.currentGame.getCurrentMove();
    }

    next() {
        this.logger.logMove(this.currentGame.getCurrentMove());
        this.currentGame.next();
    }

    getRankingList(): Player[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getPlayers().sort((player1, player2) => {
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
}
