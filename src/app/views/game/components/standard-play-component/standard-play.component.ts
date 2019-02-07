import {AfterContentInit, AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {ShootComponent} from '../shoot-component/shoot.component';
import {StandardMove, StandardPlayer} from '@app/engine/index';
import {GameService} from '../../services/game.service';
import {StandardComponent} from '../standard/standard.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-standard-play-component',
    templateUrl: './standard-play.component.html',
    styleUrls: ['./standard-play.component.css'],
})
export class StandardPlayComponent extends StandardComponent implements OnInit, AfterViewInit, OnDestroy {

    currentMove: StandardMove;
    currentPlayer: StandardPlayer;
    currentMoveSubscription: Subscription;

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
        this.currentMoveSubscription = this.gameService.getMoveObservable().subscribe(move => {
            this.reset();
            this.currentMove = <StandardMove>move;
        });

        this.currentMove.shoots.forEach((value, index) => {
            if (value) {
                this.shoots.toArray()[index].setValue(value, true);
            }
        });
    }

    ngOnDestroy(): void {
        this.currentMoveSubscription.unsubscribe();
    }

    onScoreChanged(event: number[]) {
        this.currentMove.setScore(event[0], event[1]);
    }

    onInputDone(event: number) {
        if (event === 2) {
            this.shoots.toArray()[0].receivedFocus();
        } else {
            this.shoots.toArray()[event + 1].receivedFocus();
        }
    }

    public reset() {
        for (const shoot of this.shoots.toArray()) {
            shoot.reset();
        }
        for (const shoot of this.shoots.toArray()) {
            if (!shoot.isValid()) {
                shoot.receivedFocus();
                return;
            }
        }
    }


}
