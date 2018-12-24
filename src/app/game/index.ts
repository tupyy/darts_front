import {Player} from './player';
import {Shoot} from './shoot';

export {Player} from './player';
export {Shoot} from './shoot';

export class Game {
    players: Player[];
    currentPlayer: Player;
    currentShoot: Shoot;
    shoots: Shoot[];

    constructor(players: Player[]) {
        this.players = players;
    }

    next() {
        this.currentShoot = new Shoot(this.getNextPlayer());
        this.currentPlayer = this.currentShoot.player;
        return this.currentShoot;
    }

    addShoot(shoot: Shoot) {
        this.shoots.push(shoot);
        this.currentShoot = shoot;
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
