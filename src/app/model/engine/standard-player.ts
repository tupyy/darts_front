import {Player} from './player';

export class StandardPlayer implements Player {
    id: number;
    name: string;
    private score: number;
    private temporaryScore: number;

    static fromJSON(playerJSON): StandardPlayer {
        const player = Object.create(StandardPlayer.prototype);
        return Object.assign(player, playerJSON);
    }

    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
        this.score = 301;
        this.temporaryScore = 301;
    }

    public commitScore() {
        if (this.temporaryScore >= 0) {
            this.score = this.temporaryScore;
        } else {
            this.temporaryScore = this.score;
        }
    }

    public updateScore(moveScore: number) {
        this.temporaryScore = this.score;
        this.temporaryScore -= moveScore;
    }

    public getCurrentMoveScore() {
        return this.temporaryScore;
    }

    public getScore() {
        return this.score;
    }

    public toJSON(): Player {
        const targetObj = {};
        targetObj['id'] = this.id;
        targetObj['name'] = this.name;
        targetObj['score'] = this.score;
        targetObj['temporaryScore'] = this.temporaryScore;
        return <Player>targetObj;
    }
}
