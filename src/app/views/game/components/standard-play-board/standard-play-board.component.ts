import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StandardMove, StandardPlayer} from '@app/engine/index';

@Component({
    selector: 'app-standard-play-board',
    templateUrl: './standard-play-board.component.html',
    styleUrls: ['./standard-play-board.component.css']
})
export class StandardPlayBoardComponent implements OnInit {

    @Input() currentMove: StandardMove;
    @Input() currentPlayer: StandardPlayer;
    @Output() next = new EventEmitter();
    public canNext = false;
    isFullBoard: Boolean = true;

    constructor() {
    }

    ngOnInit() {
    }

    get playerName(): string {
        return this.currentPlayer.name;
    }

    get playerScore(): number {
        if (!isNaN(this.currentMove.getTotalScore())) {
            return this.currentPlayer.getScore() - this.currentMove.getTotalScore();
        }
    }

    public changeBoardStyle() {
        this.isFullBoard = !this.isFullBoard;
    }

    get boardStyle(): string {
        return this.isFullBoard ? 'Full board' : 'Reduced board';
    }


}
