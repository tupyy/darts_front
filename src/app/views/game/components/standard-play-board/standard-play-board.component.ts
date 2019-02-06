import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StandardMove, StandardPlayer} from '@app/engine/index';
import {FullBoardComponent, ReducedBoardComponent} from '../../components/board/index';
import {BoardComponentDirective} from '../../directives/board-component.directive';
import {GameService} from '../../services/game.service';
import {StandardComponent} from '../standard/standard.component';

@Component({
    selector: 'app-standard-play-board',
    templateUrl: './standard-play-board.component.html',
    styleUrls: ['./standard-play-board.component.css']
})
export class StandardPlayBoardComponent extends StandardComponent implements OnInit {

    @Input() currentMove: StandardMove;
    @Input() currentPlayer: StandardPlayer;
    @Output() next = new EventEmitter();
    isFullBoard: Boolean = true;

    public shoots = [];

    @ViewChild(BoardComponentDirective) boardComponent: BoardComponentDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private gameService: GameService) {
        super();
    }

    ngOnInit() {
        this.loadBoardComponent();
        this.currentMove = <StandardMove>this.gameService.getCurrentMove();
        this.currentMove.shoots.forEach(v => {
            if (v) {
                this.shoots.push(v);
            }
        });
    }

    public changeBoardStyle() {
        this.isFullBoard = !this.isFullBoard;
        this.loadBoardComponent();
    }

    get boardStyle(): string {
        return this.isFullBoard ? 'Full board' : 'Reduced board';
    }

    public reset() {
        this.shoots = [];
        this.canNext$.next(false);
    }

    public onNext() {
        this.reset();
        this.gameService.next();
        this.currentMove = <StandardMove>this.gameService.getCurrentMove();
    }

    private onShootChanged(value: number) {
        if (this.shoots.length === 3) {
            return;
        }
        this.shoots.push(value);
        this.shoots.forEach((val, index) => {
            this.currentMove.setScore(index, val);
        });
        this.canNext$.next(true);
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
        this.canNext$.next(this.shoots.length > 0);
    }


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
