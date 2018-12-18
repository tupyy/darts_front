export class Player {
    id: number;
    name: string;
}

export class Shoot {
    id: number;
    player: Player;
    scores: number[];

    getScore() {
        let total = 0;
        for (const score of this.scores) {
            total += score;
        }
        return total;
    }
}

export class Move {
    id: number;
    shoots: Shoot[];

    addShoot(shoot: Shoot) {
        this.shoots.push(shoot);
    }
}

