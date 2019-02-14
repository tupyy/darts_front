import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GameService} from '../../services/game.service';
import {Subscription} from 'rxjs';
import {GameFinishAnnounceComponent} from '../../components/game-finish-announce/game-finish-announce.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {StandardPlayBoardComponent} from '../../components/standard-play-board/standard-play-board.component';

@Component({
    selector: 'app-play-view',
    templateUrl: './game-view.component.html',
    styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, OnDestroy {

    gameFinishSubscription: Subscription;

    private dialogRef: MatDialogRef<GameFinishAnnounceComponent>;
    @ViewChild(StandardPlayBoardComponent) boardComponent: StandardPlayBoardComponent;

    constructor(private gameService: GameService,
                public dialog: MatDialog,
                private router: Router,
                private activatedRoute: ActivatedRoute) {

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

}
