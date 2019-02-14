import {Move} from './move';
import {EventEmitter, Output} from '@angular/core';
import {Shoot} from './shoot';

/**
 * It represents a classic turn of a player. It holds the value of each shoot and emit a signal when the total score of the turn
 * changes
 */
export class StandardMove implements Move {

    /**
     * Id of the turn. Because the turn cannot be remove,
     * the id will be in ascend order
     */
    id: number;

    // Player id
    playerId: number;

    // Holds the shoot objects
    shoots = new Array<Shoot>();

    @Output() hasChanged = new EventEmitter<string>();

    constructor(id: number, playerId: number, shoots?: Shoot[]) {
        this.id = id;
        this.playerId = playerId;

        if (shoots !== undefined) {
            this.shoots = shoots;
        }
    }

    /**
     * Get the score of a shoot
     */
    public getScore(shootId: string) {
        let s = null;
        this.shoots.forEach(shoot => {
            if (shoot.id === shootId) {
                s = shoot;
                return;
            }
        });
        return s;
    }

    /**
     * Add shoot
     */
    public addShoot(shoot: Shoot) {
        if (this.shoots.length === 3) {
            return;
        }
        this.shoots.push(shoot);
        this.hasChanged.emit();
    }

    /**
     * Remove all shoot.
     */
    removeAll() {
        this.shoots = [];
        this.hasChanged.emit();
    }

    /**
     * Remove a shoot
     */
    removeShoot(shootId: string) {
        this.shoots.forEach((shoot, index) => {
            if (shoot.id === shootId) {
                this.shoots.splice(index, 1);
                this.hasChanged.emit();
                return;
            }
        });
    }

    /**
     * Get total score
     */
    public getTotalScore(): number {
        let sum = 0;
        this.shoots.forEach(shoot => {
            sum += shoot.value;
        });
        return sum;
    }

    /**
     * Clone the move
     */
    public clone() {
        const clone = new StandardMove(this.id, this.playerId);
        this.shoots.forEach((shoot) => {
            clone.shoots.push(shoot);
        });
        return clone;
    }

    public toJSON(): Move {
        const targetObj = {};
        targetObj['player_id'] = this.playerId;
        targetObj['shoots'] = this.shoots;
        return <Move>targetObj;
    }

    public fromJSON(moveJSON): Move {
        const move = Object.create(StandardMove.prototype);
        return Object.assign(move, moveJSON);
    }


}
