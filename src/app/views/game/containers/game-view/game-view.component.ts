import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {PlayComponentDirective} from '../../directives/play-component.directive';
import {StandardPlayComponent} from '../../components/standard-play-component/standard-play.component';
import {StandardPlayBoardComponent} from '../../components/standard-play-board/standard-play-board.component';
import {StandardMove, StandardPlayer} from '@app/engine/index';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {

    gameFinishSubscription: Subscription;
    public showBoard = new BehaviorSubject<boolean>(false);


    private dialogRef: MatDialogRef<GameFinishAnnounceComponent>;
    @ViewChild(PlayComponentDirective) playDirective: PlayComponentDirective;

    constructor(private gameService: GameService,
                public dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private componentFactoryResolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params['action'] === 'restore') {
            this.gameService.restore();
        }

        this.gameFinishSubscription = this.gameService.finishAnnounce$.subscribe(val => {
            if (val) {
                this.openDialog();
            }
        });

        this.showBoard.subscribe(val => {
            this.loadPlayComponent(this.showBoard.value);
        });
    }

    openDialog(): void {
        if (this.dialogRef === undefined) {
            this.dialogRef = this.dialog.open(GameFinishAnnounceComponent, {
                width: '300px',
                data: {winner: this.gameService.getCurrentPlayer().name}
            });

            this.dialogRef.afterClosed().subscribe(result => {
                if (result === 'home') {
                    this.router.navigate(['/']);
                } else if (result === 'new_game') {
                    this.router.navigate(['../new'], {relativeTo: this.activatedRoute});
                }
            });
        }

    }

    ngOnDestroy() {
        this.gameFinishSubscription.unsubscribe();
    }

    get playerName(): string {
        return this.gameService.getCurrentPlayer().name;
    }

    get playerScore(): number {
        if (this.gameService.getCurrentMove() instanceof StandardMove) {
            const move = <StandardMove>this.gameService.getCurrentMove();
            const player = <StandardPlayer>this.gameService.getCurrentPlayer();
            if (!isNaN(move.getTotalScore())) {
                return player.getScore() - move.getTotalScore();
            }
        }
    }

    getRankingList() {
        return this.gameService.getRankingList();
    }

    getMoves() {
        return this.gameService.getMoves();
    }

    onNext() {
        this.gameService.next();
    }

    private loadPlayComponent(_showBoard: boolean) {
        if (!_showBoard) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StandardPlayComponent);
            const viewContainerRef = this.playDirective.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
        } else {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StandardPlayBoardComponent);
            const viewContainerRef = this.playDirective.viewContainerRef;
            viewContainerRef.clear();
            const componentRef = viewContainerRef.createComponent(componentFactory);
        }
    }
}
