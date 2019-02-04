import {Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {StandardMove, StandardPlayer} from '@app/engine/index';
import {FullBoardComponent, ReducedBoardComponent} from '../../components/board/index';
import {BoardComponentDirective} from '../../directives/board-component.directive';

@Component({
    selector: 'app-standard-play-board',
    templateUrl: './standard-play-board.component.html',
    styleUrls: ['./standard-play-board.component.css']
})
export class StandardPlayBoardComponent implements OnInit {

    @Input() currentMove: StandardMove;
    @Input() currentPlayer: StandardPlayer;
    @Output() next = new EventEmitter();
    public canNext = false;
    isFullBoard: Boolean = true;

    private shoots = [];

    @ViewChild(BoardComponentDirective) boardComponent: BoardComponentDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.loadBoardComponent();
    }

    get playerName(): string {
        return this.currentPlayer.name;
    }

    get playerScore(): number {
        if (!isNaN(this.currentMove.getTotalScore())) {
            return this.currentPlayer.getScore() - this.currentMove.getTotalScore();
        }
    }

    public changeBoardStyle() {
        this.isFullBoard = !this.isFullBoard;
        this.loadBoardComponent();
    }

    get boardStyle(): string {
        return this.isFullBoard ? 'Full board' : 'Reduced board';
    }

    private onShootChanged(value: number) {
        if (this.shoots.length === 3) {
            return;
        }
        this.shoots.push(value);
        for (let i = 0; i < this.shoots.length; i++) {
            this.currentMove.setScore(i + 1, this.shoots[i]);
        }
    }

    private removeShoot(index: number) {
        this.currentMove.setScore(index + 1, 0);
        this.shoots.splice(index, 1);
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
