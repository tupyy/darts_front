import {Player} from './player';

export class Shoot {
    scores: number[] = [];

    public getTotalScore(): number {
        return this.scores.reduce((a, b) => a + b, 0);
    }
}

export class Move {
    id: number;
    player: Player;
    shoot: Shoot;

    constructor(id: number, player: Player, shoot?: Shoot) {
        this.id = id;
        this.player = player;
        if (shoot !== undefined) {
            this.shoot = shoot;
        } else {
            this.shoot = new Shoot();
        }
    }
}
