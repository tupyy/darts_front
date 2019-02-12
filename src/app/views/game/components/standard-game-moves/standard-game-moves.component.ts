import {Component, Input, OnInit} from '@angular/core';
import {StandardMove} from '../../../../model/standard-move';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-game-moves',
    templateUrl: './standard-game-moves.component.html',
    styleUrls: ['./standard-game-moves.component.css']
})
export class StandardGameMovesComponent implements OnInit {

    @Input() moves: StandardMove[];

    constructor(private gameService: GameService) {
    }

    playerName(): string {
        return this.gameService.getCurrentPlayer().name;
    }

    ngOnInit() {
    }

}
