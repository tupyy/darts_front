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
    }

    public getScore() {
        return this.score;
    }

    public setScore(newScore: number) {
        this.score = newScore;
    }

    public toJSON(): Player {
        const targetObj = {};
        targetObj['id'] = this.id;
        targetObj['name'] = this.name;
        targetObj['score'] = this.score;
        return <Player>targetObj;
    }
}
