import {Component, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-game-rankings',
    templateUrl: './game-ranking.component.html',
    styleUrls: ['./game-ranking.component.css']
})
export class GameRankingComponent implements OnInit {

    constructor(private gameService: GameService) {
    }

    ngOnInit() {
    }

    rankings() {
        return this.gameService.getRankingList();
    }

}
