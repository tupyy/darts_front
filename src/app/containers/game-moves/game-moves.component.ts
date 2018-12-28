import {Component, Input, OnInit} from '@angular/core';
import {Move} from '../../game';

@Component({
    selector: 'app-game-moves',
    templateUrl: './game-moves.component.html',
    styleUrls: ['./game-moves.component.css']
})
export class GameMovesComponent implements OnInit {

    @Input() moves: Move[];

    constructor() {
    }

    ngOnInit() {
    }

}
