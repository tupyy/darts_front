import {Player} from './player';
import {Move} from './move';
import {Observable} from 'rxjs';

export {Player} from './player';
export {Move} from './move';

export interface Game {
    players: Player[];
    moves: Move[];
    gameType: number;
    id: string;

    start();

    // go to next move
    next(): void;

    // go the the prev move
    prev(): void;

    resume(moveID: number): void;

    // announce when the main-component is finished
    isFinished(): Observable<boolean>;

    // get the current move
    getCurrentMove(): Observable<Move>;

    getCurrentPlayer(): Observable<Player>;

    // get move
    getMove(id: number): Move;

    getMoves(): Move[];

    // get player by id
    getPlayer(id: number): Player;

    // get ranking list
    getRankings(): Player[];

    toJSON(): Game;
}

export interface GameJSON extends Game {
    currentPlayerID: number;
}

