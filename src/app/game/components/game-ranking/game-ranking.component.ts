import {Component, Input, OnInit} from '@angular/core';
import {Player} from '../../engine/game';

@Component({
    selector: 'app-game-rankings',
    templateUrl: './game-ranking.component.html',
    styleUrls: ['./game-ranking.component.css']
})
export class GameRankingComponent implements OnInit {

    @Input() rankings: Player[];

    constructor() {

    }

    ngOnInit() {
    }

}
