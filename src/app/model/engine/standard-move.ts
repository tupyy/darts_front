import {Move} from './move';
import {EventEmitter, Output} from '@angular/core';

export class StandardMove implements Move {
    id: number;
    playerId: number;
    shoots: number[];

    @Output() hasChanged = new EventEmitter<number>();


    static fromJSON(moveJSON): StandardMove {
        const move = Object.create(StandardMove.prototype);
        return Object.assign(move, moveJSON);
    }

    constructor(id: number, playerId: number, shoots?: number[]) {
        this.id = id;
        this.playerId = playerId;

        if (shoots !== undefined) {
            this.shoots = shoots;
        } else {
            this.shoots = [0, 0, 0];
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
        this.shoots[shootId] = value;
        this.hasChanged.next(shootId);
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

    public toJSON(): Move {
        const targetObj = {};
        targetObj['player_id'] = this.playerId;
        targetObj['shoots'] = this.shoots;
        return <Move>targetObj;
    }
}
