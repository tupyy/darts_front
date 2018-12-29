import {Player} from './player';

export class Move {
    id: number;
    player: Player;
    shoots: number[];

    constructor(id: number, player: Player, shoots?: number[]) {
        this.id = id;
        this.player = player;
        this.shoots = new Array(3);
        if (shoots !== undefined) {
            this.shoots = shoots;
        }
    }

    getShootScore(index: number) {
        try {
            return this.shoots[index];
        } catch (e) {
            return 0;
        }
    }

    setShootScore(index: number, value: number) {
        this.shoots[index - 1] = value;
    }

    public getTotalScore(): number {
        let sum = 0;
        this.shoots.forEach(val => {
            sum += val;
        });
        return sum;
    }

    public updatePlayerScore() {
        this.player.updateScore(this.getTotalScore());
    }

    public clone() {
        const clone = new Move(this.id, this.player);
        this.shoots.forEach((val, index) => {
            clone.shoots[index] = val;
        });
        return clone;
    }
}
