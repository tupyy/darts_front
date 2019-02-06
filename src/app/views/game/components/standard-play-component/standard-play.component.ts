import {AfterContentInit, AfterViewInit, Component, EventEmitter, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {StandardMove, StandardPlayer} from '@app/engine/index';
import {GameService} from '../../services/game.service';
import {StandardComponent} from '../standard/standard.component';

@Component({
    selector: 'app-standard-play-component',
    templateUrl: './standard-play.component.html',
    styleUrls: ['./standard-play.component.css'],
})
export class StandardPlayComponent extends StandardComponent implements OnInit, AfterViewInit {

    currentMove: StandardMove;
    currentPlayer: StandardPlayer;

    /** Get handle on cmp tags in the template */
    @ViewChildren('shoot') shoots: QueryList<ShootComponent>;

    constructor(private gameService: GameService) {
        super();
    }

    ngOnInit() {
        this.currentMove = <StandardMove>this.gameService.getCurrentMove();
        this.currentPlayer = <StandardPlayer>this.gameService.getCurrentPlayer();
    }

    ngAfterViewInit(): void {
        this.currentMove.shoots.forEach((value, index) => {
            if (value) {
                this.shoots.toArray()[index].setValue(value, true);
                this.canNext$.next(true);
            }
        });
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
        this.canNext$.next(_canNext);
    }

    onInputDone(event: number) {
        if (event === 3) {
            this.shoots.toArray()[0].receivedFocus();
        } else {
            this.shoots.toArray()[event].receivedFocus();
        }
    }

    public reset() {
        for (const shoot of this.shoots.toArray()) {
            shoot.reset();
        }
        this.canNext$.next(false);
        for (const shoot of this.shoots.toArray()) {
            if (!shoot.isValid()) {
                shoot.receivedFocus();
                return;
            }
        }
    }

    public onNext() {
        this.gameService.next();
        this.currentMove = <StandardMove>this.gameService.getCurrentMove();
        this.reset();
    }


}
