import {Injectable} from '@angular/core';

import {Observable} from 'rxjs';

import {Move, Player, Shoot} from './game_def';
import {PLAYERS} from './mock_players';


@Injectable({
    providedIn: 'root'
})
export class GameService {

    currentPlayer: Player;
    players: Player[];
    currentMove: Move;
    moves: Move[];

    constructor(_players: Player[]) {
        this.players = _players;
    }

    newGame() {
        this.moves = [];
    }

    addNewShoot(shoot: Shoot) {
        this.currentMove.addShoot(shoot);
    }
}
