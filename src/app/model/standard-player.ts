import {Player} from './player';

/**
 * It represents a player data. It holds the name and the current score of a player.
 */
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
    }

    /**
     * Get the score. It represents a score of the last turn.
     */
    public getScore() {
        return this.score;
    }

    /**
     * Set the score.
     */
    public setScore(newScore: number) {
        this.score = newScore;
    }

    /**
     * Set the temporary score. It represents the score of the player in the current move.
     */
    public setTemporaryScore(newScore: number) {
        this.temporaryScore = newScore;
    }

    /**
     * Get the temporary score. It represents the score of the player in the current move.
     */
    getTemporaryScore(): number {
        return this.temporaryScore;
    }

    /**
     * Record the score.
     */
    public commitScore() {
        if (this.temporaryScore >= 0) {
            this.score = this.temporaryScore;
        } else {
            this.temporaryScore = this.score;
        }
    }

    public toJSON(): Player {
        const targetObj = {};
        targetObj['id'] = this.id;
        targetObj['name'] = this.name;
        targetObj['score'] = this.score;
        return <Player>targetObj;
    }




}
