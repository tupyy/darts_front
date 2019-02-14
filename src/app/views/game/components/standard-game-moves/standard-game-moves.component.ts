import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';


@Component({
    selector: 'app-game-moves',
    templateUrl: './standard-game-moves.component.html',
    styleUrls: ['./standard-game-moves.component.css']
})
export class StandardGameMovesComponent implements OnInit {

    constructor(private gameService: GameService) {
    }

    playerName(): string {
        return this.gameService.getCurrentPlayer().name;
    }

    moves() {
        return this.gameService.getMoves();
    }

    ngOnInit() {
    }

}
