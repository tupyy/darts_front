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
}
