import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move} from '../../services';
import {Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})

export class GameViewComponent implements OnInit, OnDestroy {

    currentMove: Move;
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

        gameService.getCurrentMove().subscribe((move) => {
            if (move) {
                this.currentMove = move;
            }
        });
    }

    ngOnInit() {
    }

    openDialog(): void {
        if (this.dialogRef === undefined) {
            this.dialogRef = this.dialog.open(GameFinishAnnounceComponent, {
                width: '300px',
                data: {winner: this.gameService.getCurrentGame().getCurrentPlayer().name}
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
