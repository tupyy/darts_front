import {Observable} from 'rxjs';

export interface Move {
    id: number;
    playerId: number;

    clone(): Move;
}

