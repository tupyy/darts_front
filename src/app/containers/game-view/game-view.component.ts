import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move} from '../../game';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
    providers: [GameService]
})
export class GameViewComponent implements OnInit {

    constructor(private gameService: GameService) {

    }

    ngOnInit() {
    }

    get currentMove(): Move {
        return this.gameService.getCurrentMove();
    }
}
