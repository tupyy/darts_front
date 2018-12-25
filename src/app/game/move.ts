import {Player} from './player';

export class Move {
    id: number;
    player: Player;
    shoots: number[] = [];

    constructor(id: number, player: Player, shoots?: number[]) {
        this.id = id;
        this.player = player;
        if (shoots !== undefined) {
            this.shoots = shoots;
        }
    }

    setShootScore(index: number, value: number) {
        this.shoots[index - 1] = value;
    }

    public getTotalScore(): number {
        return this.shoots.reduce((a, b) => a + b, 0);
    }
}
