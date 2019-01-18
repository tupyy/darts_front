import {Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move, Player} from '../../engine/game';
import {Observable, Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StandardGame} from '../../engine/standard-game';
import {PlayComponentDirective} from '../../directives/play-component.directive';
import {StandardPlayComponent} from '../../components/standard-play-component/standard-play.component';
import {StandardMove} from '../../engine/standard-move';
import {StandardPlayer} from '../../engine/standard-player';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})

export class GameViewComponent implements OnInit, OnDestroy {

    gameFinishSubscription: Subscription;

    private dialogRef: MatDialogRef<GameFinishAnnounceComponent>;
    @ViewChild(PlayComponentDirective) playComponent: PlayComponentDirective;

    constructor(private gameService: GameService,
                public dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private componentFactoryResolver: ComponentFactoryResolver) {
        this.gameFinishSubscription = gameService.finishAnnounce$.subscribe(val => {
            if (val) {
                this.openDialog();
            }
        });


    }

    ngOnInit() {
        if (this.activatedRoute.snapshot.params['action'] === 'restore') {
            this.gameService.restore();
        }
    }

    openDialog(): void {
        if (this.dialogRef === undefined) {
            this.dialogRef = this.dialog.open(GameFinishAnnounceComponent, {
                width: '300px',
                data: {winner: this.currentPlayer.name}
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

    get currentMove(): Move {
        return this.gameService.getCurrentMove();
    }

    get currentPlayer(): Player {
        return this.gameService.getCurrentPlayer();
    }

    ngOnDestroy() {
        this.gameFinishSubscription.unsubscribe();
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

    private loadGameComponent() {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(StandardPlayComponent);
        const viewContainerRef = this.playComponent.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<StandardPlayComponent>componentRef.instance).currentMove = <StandardMove>this.currentMove;
        (<StandardPlayComponent>componentRef.instance).currentPlayer = <StandardPlayer>this.currentPlayer;
        (<StandardPlayComponent>componentRef.instance).next.subscribe(() => {
            console.log(this.gameService.next());
        });
    }
}
