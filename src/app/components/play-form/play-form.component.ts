import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Move} from '../../game';
import {ShootComponent} from '../shoot-component/shoot.component';

@Component({
    selector: 'app-play-form',
    templateUrl: './play-form.component.html',
    styleUrls: ['./play-form.component.css'],
})
export class PlayFormComponent implements OnInit {

    @Input() currentMove: Move;
    @Output() next = new EventEmitter();
    private canNext = false;

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
            if (shoot.hasValue() ) {
                _canNext = true;
                break;
            }
        }
        this.canNext = _canNext;
    }

    onNext() {
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
