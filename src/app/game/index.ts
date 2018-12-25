import {Player} from './player';
import {Move, Shoot} from './move';

export {Player} from './player';
export {Move} from './move';

export class Game {
    players: Player[];
    currentPlayer: Player;
    currentMove: Move;
    moves: Move[];

    constructor(players: Player[]) {
        this.players = players;
        this.currentMove = new Move(1, this.players[0], new Shoot());
    }

    next() {
        // save the current move
        this.moves.push(this.currentMove);

        this.currentMove = new Move(this.moves.length + 1, this.getNextPlayer(), new Shoot());
        this.currentPlayer = this.currentMove.player;
        return this.currentMove;
    }

    private getNextPlayer() {
        if (this.currentPlayer.id + 1 > this.players.length) {
            this.currentPlayer = this.players[0];
        } else {
            this.currentPlayer = this.players[this.currentPlayer.id + 1];
        }
        return this.currentPlayer;
    }

}
