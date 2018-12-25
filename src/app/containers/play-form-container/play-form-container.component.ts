import {Component, OnInit} from '@angular/core';
import {PlayService} from './services/play.service';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-play-form-container',
    templateUrl: './play-form-container.component.html',
    styleUrls: ['./play-form-container.component.css'],
    providers: [PlayService]
})
export class PlayFormContainerComponent implements OnInit {

    constructor(private playService: PlayService) {
    }

    ngOnInit() {
    }

    getShootScore(index: number): number {
        return this.playService.getShootScore(index);
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
