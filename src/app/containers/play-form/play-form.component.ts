import {Component, Input, OnInit} from '@angular/core';
import {ShootService} from '../../services/shoot.service';
import {Move} from '../../game';

@Component({
    selector: 'app-play-form',
    templateUrl: './play-form.component.html',
    styleUrls: ['./play-form.component.css'],
    providers: [ShootService]
})
export class PlayFormComponent implements OnInit {

    @Input() currentMove: Move;
    constructor() {
    }

    ngOnInit() {
    }

    get currentPlayer(): string {
        return this.currentMove.player.name;
    }

    get currentScore(): number {
        return this.currentMove.getTotalScore();
    }

    onScoreChanged(event: number[]) {
        this.currentMove.setShootScore(event[0], event[1]);
    }
}
