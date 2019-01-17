import {Player} from './player';
import {Move} from './move';
import {Observable} from 'rxjs';

export {Player} from './player';
export {Move} from './move';

export interface Game {
    players: Player[];
    moves: Move[];

    // go to next move
    next(): Move;

    // go the the prev move
    prev(): Move;

    // announce when the main-component is finished
    isFinished(): Observable<boolean>;

    // get the current move
    getCurrentMove(): Move;

    getCurrentPlayer(): Player;

    // get move
    getMove(id: number): Move;

    getMoves(): Move[];

    // get player by id
    getPlayer(id: number): Player;

    // get ranking list
    getRankings(): Player[];

}

