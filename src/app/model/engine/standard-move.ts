import {Move} from './move';
import {BehaviorSubject, Observable} from 'rxjs';

export class StandardMove implements Move {
    id: number;
    playerId: number;
    shoots: number[];

    private _hasChanged = new BehaviorSubject<number>(0);

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
        this._hasChanged.next(shootId - 1);
    }

    public getTotalScore(): number {
        let sum = 0;
        this.shoots.forEach(val => {
            sum += val;
        });
        return sum;
    }

    public hasChanged(): Observable<number> {
        return this._hasChanged.asObservable();
    }

    public clone() {
        const clone = new StandardMove(this.id, this.playerId);
        this.shoots.forEach((val, index) => {
            clone.shoots[index] = val;
        });
        return clone;
    }
}
