import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move, Player} from '@app/engine/index';
import {Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {BoardComponentDirective} from '../../directives/board-component.directive';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css']
})

export class GameViewComponent implements OnInit, OnDestroy {

    gameFinishSubscription: Subscription;

    private dialogRef: MatDialogRef<GameFinishAnnounceComponent>;

    constructor(private gameService: GameService,
                public dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
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
}
