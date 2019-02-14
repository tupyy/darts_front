import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Move, Player, StandardMove, StandardPlayer} from '@app/model/index';
import {FullBoardComponent, ReducedBoardComponent} from '../../components/board/index';
import {BoardComponentDirective} from '../../directives/board-component.directive';
import {GameService} from '../../services/game.service';
import {Subscription} from 'rxjs';
import {Shoot} from '@app/model/shoot';

@Component({
    selector: 'app-standard-play-board',
    templateUrl: './standard-play-board.component.html',
    styleUrls: ['./standard-play-board.component.css']
})
export class StandardPlayBoardComponent implements OnInit, OnDestroy {

    public isFullBoard: Boolean = true;

    public currentMove: Move;
    private currentPlayer: Player;
    private currentMoveSubscription: Subscription;

    @ViewChild(BoardComponentDirective) boardComponent: BoardComponentDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private gameService: GameService) {
    }

    ngOnInit() {
        this.loadBoardComponent();
        this.currentMoveSubscription = this.gameService.getMoveObservable().subscribe(move => {
            this.currentMove = <StandardMove>move;
            this.currentPlayer = <StandardPlayer>this.gameService.getCurrentPlayer();
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

    /**
     * Get the name of the board styling
     */
    get boardStyle(): string {
        return this.isFullBoard ? 'Full board' : 'Reduced board';
    }

    /**
     * Reset the current move score
     */
    public reset() {
        this.currentMove.removeAll();
    }

    /**
     * Proceed to the next move
     */
    public onNext() {
        this.gameService.next();
    }

    /**
     * Return the current player name
     */
    public playerName() {
        return this.currentPlayer.name;
    }

    /**
     * Return the current player score
     */
    public playerScore() {
        return this.currentPlayer.getTemporaryScore();
    }

    /**
     * Receiver for onNewShoot event
     */
    private onShootChanged(shoot: Shoot) {
        this.currentMove.addShoot(shoot);
    }

    /**
     * Delete a shoot from the board
     */
    private removeShoot(id: string) {
        this.currentMove.removeShoot(id);
    }

    /**
     * Return the shoot with id id
     * @param id id of the shoot
     */
    private getShoot(id: string) {
        for (const shoot of this.currentMove.shoots) {
            if (shoot.id === id) {
                return shoot;
            }
        }

        return null;
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
