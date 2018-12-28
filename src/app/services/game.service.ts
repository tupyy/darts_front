import {Injectable} from '@angular/core';
import {Game, Move, Player} from '../game';
import {LoggerService} from '../services/logger.service';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;
    players: Player[] = [];

    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    constructor(private logger: LoggerService) {
    }

    addPlayer(name: string) {
        const player = new Player(this.players.length + 1, name);
        this.players.push(player);
    }

    startGame(playersNames: string[]): void {
        for (const playerName of playersNames) {
            this.addPlayer(playerName);
        }
        this.currentGame = new Game(this.players);
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
