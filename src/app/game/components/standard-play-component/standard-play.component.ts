import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {StandardMove} from '../../engine/standard-move';
import {StandardPlayer} from '../../engine/standard-player';

@Component({
    selector: 'app-standard-play-component',
    templateUrl: './standard-play.component.html',
    styleUrls: ['./standard-play.component.css'],
})
export class StandardPlayComponent implements OnInit {

    @Input() currentMove: StandardMove;
    @Input() currentPlayer: StandardPlayer;
    @Output() next = new EventEmitter();
    public canNext = false;

    /** Get handle on cmp tags in the template */
    @ViewChildren('shoot') shoots: QueryList<ShootComponent>;

    constructor() {
    }

    ngOnInit() {
    }

    get playerName(): string {
        return this.currentPlayer.name;
    }

    get playerScore(): number {
        if (!isNaN(this.currentMove.getTotalScore())) {
            const currentScore = this.currentPlayer.getScore() - this.currentMove.getTotalScore();
            if (currentScore > 0) {
                return currentScore;
            }
            return 0;
        } else {
            return this.currentPlayer.getScore();
        }
    }

    onScoreChanged(event: number[]) {
        this.currentMove.setScore(event[0], event[1]);

        let _canNext = false;
        for (const shoot of this.shoots.toArray()) {
            if (shoot.hasValue()) {
                _canNext = true;
                break;
            }
        }
        this.canNext = _canNext;
    }

    onInputDone(event: number) {
        console.log(event);
        if (event === 3) {
            this.onNext();
            this.shoots.toArray()[0].receivedFocus();
        } else {
            this.shoots.toArray()[event].receivedFocus();
        }
    }

    onNext() {
        for (const shoot of this.shoots.toArray()) {
            if (!shoot.isValid()) {
                shoot.receivedFocus();
                return;
            }
        }

        this.next.emit();
        for (const shoot of this.shoots.toArray()) {
            shoot.reset();
        }
    }

    reset() {
        for (const shoot of this.shoots.toArray()) {
            shoot.reset();
        }
        this.canNext = false;
    }


}
