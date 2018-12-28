import {Injectable} from '@angular/core';
import {Move} from '../game';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {

    constructor() {
    }

    log(message: string): void {
        console.log(message);
    }

    logMove(move: Move): void {
        let message: string;
        message = 'Move id: ' + move.id + '\n';
        message += 'Current player: ' + move.player.name + '\n';
        message += 'Score: ' + move.getTotalScore() + '\n';
        message += 'Shoots: ' + move.getShootScore(0) + '/' + move.getShootScore(1) + '/' + move.getShootScore(2);
        console.log(message);
    }
}
