import {Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {StandardPlayer, StandardMove} from '@app/engine/index';
import {GameService} from '../../services/game.service';

@Component({
    selector: 'app-standard-play-component',
    templateUrl: './standard-play.component.html',
    styleUrls: ['./standard-play.component.css'],
})
export class StandardPlayComponent implements OnInit {

    currentMove: StandardMove;
    currentPlayer: StandardPlayer;
    @Output() next = new EventEmitter();
    public canNext = false;

    /** Get handle on cmp tags in the template */
    @ViewChildren('shoot') shoots: QueryList<ShootComponent>;

    constructor(private gameService: GameService) {
        this.currentMove = <StandardMove> this.gameService.getCurrentMove();
        this.currentPlayer = <StandardPlayer> this.gameService.getCurrentPlayer();
    }

    ngOnInit() {
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
