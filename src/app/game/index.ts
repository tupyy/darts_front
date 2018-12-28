import {Player} from './player';
import {Move} from './move';
import {Subject} from 'rxjs';

export {Player} from './player';
export {Move} from './move';

export class Game {
    players: Player[];
    private currentMove: Move;
    private moves: Move[] = [];

    private finishAnnouncedSource = new Subject<boolean>();
    finishAnnouced$ = this.finishAnnouncedSource.asObservable();

    constructor(players: Player[]) {
        this.players = players;
        this.currentMove = new Move(this, 1, this.players[0]);
    }

    next() {
        // save the current move
        this.moves.push(this.currentMove);
        this.currentMove.updatePlayerScore();
        this.currentMove = new Move(this, this.moves.length + 1, this.getNextPlayer());
    }

    getCurrentMove(): Move {
        if (this.currentMove === undefined) {
            this.next();
        }
        return this.currentMove;
    }

    gameFinished() {
        this.finishAnnouncedSource.next(true);
    }

    private getNextPlayer() {
        const id = this.currentMove.player.id; // base 0 array
        if (id + 1 === this.players.length) {
            return this.players[0];
        } else {
            return this.players[id + 1];
        }
    }


}
