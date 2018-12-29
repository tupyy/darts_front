import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Move} from '../../game';
import {Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css'],
})

export class GameViewComponent implements OnInit, OnDestroy {

    gameFinishSubscription: Subscription;
    private dialogRef: MatDialogRef<GameFinishAnnounceComponent>;

    constructor(private gameService: GameService, public dialog: MatDialog, private router: Router) {
        this.gameFinishSubscription = gameService.finishAnnounce$.subscribe(val => {
            if (val) {
                console.log('open');
                this.openDialog();
            }
        });
    }

    ngOnInit() {
    }

    openDialog(): void {
        if (this.dialogRef === undefined) {
            this.dialogRef = this.dialog.open(GameFinishAnnounceComponent, {
                width: '300px',
                data: {winner: this.gameService.getCurrentMove().player.name}
            });

            this.dialogRef.afterClosed().subscribe(result => {
                if (result === 'home') {
                    this.router.navigate(['/']);
                } else if (result === 'new_game') {
                    this.router.navigate(['/new']);
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
