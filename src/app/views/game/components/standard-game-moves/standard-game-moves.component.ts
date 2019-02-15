import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move} from '@app/model/move';


@Component({
    selector: 'app-game-moves',
    templateUrl: './standard-game-moves.component.html',
    styleUrls: ['./standard-game-moves.component.css']
})
export class StandardGameMovesComponent implements OnInit {

    constructor(private gameService: GameService) {
    }

    playerName(move: Move): string {
        return this.gameService.getPlayer(move.playerId).name;
    }

    moves() {
        return this.gameService.getMoves();
    }

    ngOnInit() {
    }

}
