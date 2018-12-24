import {Player} from './player';

export class Shoot {
    id: number;
    player: Player;
    scores: number[];

    constructor(player: Player) {
        this.player = player;
    }

    getScore() {
        let total = 0;
        this.scores.forEach(function(value) {
            total += value;
        });
        return total;
    }
}
