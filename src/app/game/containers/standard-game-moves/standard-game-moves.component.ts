import {Component, Input, OnInit} from '@angular/core';
import {StandardMove} from '../../services/move';
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

    playerName(id: number): string {
        return this.gameService.currentGame.getPlayer(id).name;
    }

    ngOnInit() {
    }

}
