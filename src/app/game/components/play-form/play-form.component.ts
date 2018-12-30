import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {Move} from '../../services';

@Component({
    selector: 'app-play-form',
    templateUrl: './play-form.component.html',
    styleUrls: ['./play-form.component.css'],
})
export class PlayFormComponent implements OnInit {

    @Input() currentMove: Move;
    @Output() next = new EventEmitter();
    public canNext = false;

    /** Get handle on cmp tags in the template */
    @ViewChildren('shoot') shoots: QueryList<ShootComponent>;

    constructor() {
    }

    ngOnInit() {
    }

    get currentPlayer(): string {
        return this.currentMove.player.name;
    }

    get currentScore(): number {
        if (!isNaN(this.currentMove.getTotalScore())) {
            return this.currentMove.player.getScore() - this.currentMove.getTotalScore();
        } else {
            return this.currentMove.player.getScore();
        }
    }

    onScoreChanged(event: number[]) {
        this.currentMove.setShootScore(event[0], event[1]);

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
