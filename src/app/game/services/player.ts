export class Player {
    id: number;
    name: string;
    private score: number;

    constructor(_id: number, _name: string) {
        this.id = _id;
        this.name = _name;
        this.score = 40;
    }

    updateScore(moveScore: number) {
        const oldValue = this.score;
        this.score -= moveScore;
        if (this.score < 0) {
            this.score = oldValue;
        }
    }

    temporaryUpdateScore(moveScore: number) {
        return this.score - moveScore;
    }

    getScore() {
        return this.score;
    }
}


