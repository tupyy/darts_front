import {Injectable, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';

@Injectable()
export class ShootService {
    scores: number[] = [0, 0, 0];

    constructor() {
    }

    scoreChanged(id: number, value: number): void {
        this.scores[id] = value;
    }

    getTotalScore(): number {
        return this.scores.reduce((a, b) => a + b, 0);
    }

}
