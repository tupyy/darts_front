import {Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move, Player} from '../../engine/game';
import {Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StandardGame} from '../../engine/standard-game';
import {PlayComponentDirective} from '../../directives/play-component.directive';
import {StandardPlayComponent} from '../../components/standard-play-component/standard-play.component';
import {StandardMove} from '../../engine/standard-move';
import {StandardPlayer} from '../../engine/standard-player';

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
        if (this.gameService.currentGame instanceof StandardGame) {
            this.loadGameComponent();
        }
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

    get currentMove(): Move {
        return this.gameService.getCurrentMove();
    }

    get currentPlayer(): Player {
        return this.gameService.getCurrentPlayer();
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
        (<StandardPlayComponent>componentRef.instance).currentMove = <StandardMove>this.gameService.getCurrentMove();
        (<StandardPlayComponent>componentRef.instance).currentPlayer = <StandardPlayer>this.gameService.getCurrentPlayer();
        (<StandardPlayComponent>componentRef.instance).next.subscribe(() => {
            this.gameService.next();
        });
    }
}
