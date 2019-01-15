export interface Move {
    id: number;
    playerId: number;

    clone(): Move;
}

export class StandardMove implements Move {
    id: number;
    playerId: number;
    shoots: number[];

    constructor(id: number, playerId: number, shoots?: number[]) {
        this.id = id;
        this.playerId = playerId;

        if (shoots !== undefined) {
            this.shoots = shoots;
        } else {
            this.shoots = new Array(3);
        }
    }

    getScore(shootId: number) {
        try {
            return this.shoots[shootId];
        } catch (e) {
            return 0;
        }
    }

    setScore(shootId: number, value: number) {
        this.shoots[shootId - 1] = value;
    }

    public getTotalScore(): number {
        let sum = 0;
        this.shoots.forEach(val => {
            sum += val;
        });
        return sum;
    }

    public clone() {
        const clone = new StandardMove(this.id, this.playerId);
        this.shoots.forEach((val, index) => {
            clone.shoots[index] = val;
        });
        return clone;
    }
}
