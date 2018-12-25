import {Injectable} from '@angular/core';
import {Game, Move, Player} from '../game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;
    players: Player[] = [];

    constructor() {
    }

    addPlayer(name: string) {
        // this.player = new Player(1, );
        // this.player.id = this.players.length + 1;
        // this.player.name = name;
        //
        // this.players.push(this.player);
    }

    startGame(playersNames: string[]): void {

    }

    getCurrentMove(): Move {
        // mock it
        const player = new Player(1, 'Bob');
        const move = new Move(1, player);
        return move;
    }
}
