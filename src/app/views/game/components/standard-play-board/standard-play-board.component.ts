import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Move, Player, StandardMove, StandardPlayer} from '@app/model/index';
import {FullBoardComponent, ReducedBoardComponent} from '../../components/board/index';
import {BoardComponentDirective} from '../../directives/board-component.directive';
import {GameService} from '../../services/game.service';
import {StandardComponent} from '../standard/standard.component';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-standard-play-board',
    templateUrl: './standard-play-board.component.html',
    styleUrls: ['./standard-play-board.component.css']
})
export class StandardPlayBoardComponent extends StandardComponent implements OnInit, OnDestroy {

    public shoots = [];
    public isFullBoard: Boolean = true;

    private currentMove: Move;
    private currentPlayer: Player;
    private currentMoveSubscription: Subscription;

    @ViewChild(BoardComponentDirective) boardComponent: BoardComponentDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private gameService: GameService) {
        super();
    }

    ngOnInit() {
        this.loadBoardComponent();
        this.currentMoveSubscription = this.gameService.getMoveObservable().subscribe(move => {
            this.currentMove = <StandardMove>move;
            this.currentPlayer = <StandardPlayer> this.gameService.getCurrentPlayer();
        });
        this.currentMove.shoots.forEach(v => {
            if (v) {
                this.shoots.push(v);
            }
        });
    }

    ngOnDestroy(): void {
        this.currentMoveSubscription.unsubscribe();
    }

    /**
     * Change board style: either full board or reduced board
     */
    public changeBoardStyle() {
        this.isFullBoard = !this.isFullBoard;
        this.loadBoardComponent();
    }

    get boardStyle(): string {
        return this.isFullBoard ? 'Full board' : 'Reduced board';
    }

    /**
     * Reset the current move score
     */
    public reset() {
        this.shoots = [];
        [0, 1, 2].forEach(v => {
            this.currentMove.setScore(v, 0);
        });
    }

    /**
     * Proceed to the next move
     */
    public onNext() {
        this.gameService.next();
        this.shoots = [];
    }

    public playerName() {
        return this.currentPlayer.name;
    }

    public playerScore() {
        return this.currentPlayer.getTemporaryScore();
    }

    private onShootChanged(value: number) {
        if (this.shoots.length === 3) {
            return;
        }
        this.shoots.push(value);
        this.shoots.forEach((val, index) => {
            this.currentMove.setScore(index, val);
        });
    }

    private removeShoot(index: number) {
        this.shoots.splice(index, 1);
        for (let i = 0; i < 3; i++) {
            if (i < this.shoots.length) {
                this.currentMove.setScore(i, this.shoots[i]);
            } else {
                this.currentMove.setScore(i, 0);
            }
        }
    }

    /**
     * Load the full board component or the reduced board component
     */
    private loadBoardComponent() {
        if (this.isFullBoard) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(FullBoardComponent);
            const viewContainerRef = this.boardComponent.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<FullBoardComponent>componentRef.instance).scoredChanged.subscribe((value) => {
                this.onShootChanged(value);
            });
        } else {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ReducedBoardComponent);
            const viewContainerRef = this.boardComponent.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
            (<ReducedBoardComponent>componentRef.instance).scoredChanged.subscribe((value) => {
                this.onShootChanged(value);
            });
        }
    }


}
