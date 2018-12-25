import {Injectable} from '@angular/core';
import {Game, Player} from '../game';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentGame: Game;
    player: Player;
    players: Player[] = [];

    constructor() {
    }

    addPlayer(name: string) {
        this.player = new Player();
        this.player.id = this.players.length + 1;
        this.player.name = name;

        this.players.push(this.player);
    }

    startGame(): Game {
        this.currentGame = new Game(this.players);
        return this.currentGame;
    }

    canStartGame(): boolean {
        return this.players.length > 0;
    }
}
