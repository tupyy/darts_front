import {Player} from './player';
import {Game} from './index';

export class Move {
    id: number;
    player: Player;
    parent: Game;
    shoots: number[] = [];

    constructor(parent: Game, id: number, player: Player, shoots?: number[]) {
        this.id = id;
        this.player = player;
        this.parent = parent;
        if (shoots !== undefined) {
            this.shoots = shoots;
        }
    }

    setShootScore(index: number, value: number) {
        this.shoots[index - 1] = value;
        if (this.player.temporaryUpdateScore(this.getTotalScore()) === 0) {
            this.parent.gameFinished();
        }
    }

    public getTotalScore(): number {
        return this.shoots.reduce((a, b) => a + b, 0);
    }

    public updatePlayerScore() {
        this.player.updateScore(this.getTotalScore());
    }
}
