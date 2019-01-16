import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {StandardMove} from '../../services/move';
import {StandardPlayer} from '../../services/player';

@Component({
    selector: 'app-standard-play-form',
    templateUrl: './standard-play-form.component.html',
    styleUrls: ['./standard-play-form.component.css'],
})
export class StandardPlayFormComponent implements OnInit {

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
            return this.currentPlayer.getScore() - this.currentMove.getTotalScore();
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
