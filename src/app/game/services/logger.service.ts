import {Injectable} from '@angular/core';
import {Move, StandardMove} from './move';

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
        if (move instanceof StandardMove) {
            const standardMove = <StandardMove>move;
            let message: string;
            message = 'Move id: ' + standardMove.id + '\n';
            message += 'Current player: ' + standardMove.playerId + '\n';
            message += 'Score: ' + standardMove.getTotalScore() + '\n';
            message += 'Shoots: ' + standardMove.getScore(0) + '/' + standardMove.getScore(1) + '/' + standardMove.getScore(2);
            console.log(message);
        }

    }
}
