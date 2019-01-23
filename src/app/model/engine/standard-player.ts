import {Player} from './player';

export class StandardPlayer implements Player {
    id: number;
    name: string;
    private score: number;

    static fromJSON(playerJSON): StandardPlayer {
        const player = Object.create(StandardPlayer.prototype);
        return Object.assign(player, playerJSON);
    }

    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
        this.score = 301;
    }

    updateScore(moveScore: number) {
        const oldValue = this.score;
        this.score -= moveScore;
        if (this.score < 0) {
            this.score = oldValue;
        }
    }

    getScore() {
        return this.score;
    }
}
