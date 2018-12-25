import {Component, OnInit} from '@angular/core';
import {ShootService} from '../../services/shoot.service';

@Component({
    selector: 'app-play-form-container',
    templateUrl: './play-form-container.component.html',
    styleUrls: ['./play-form-container.component.css'],
    providers: [ShootService]
})
export class PlayFormContainerComponent implements OnInit {

    constructor(private playService: ShootService) {
    }

    ngOnInit() {
    }

    get currentPlayer(): string {
        return 'Bob';
    }

    get currentScore(): number {
        return this.playService.getTotalScore();
    }

    onScoreChanged(event: number[]) {
        this.playService.scoreChanged(event[0], event[1]);
    }
}
