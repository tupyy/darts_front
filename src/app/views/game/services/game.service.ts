import {Injectable, OnDestroy} from '@angular/core';
import {Game, Move, Player} from '@app/engine/index';
import {Subject, Subscription} from 'rxjs';
import {StandardGame} from '@app/engine/standard-game';
import {StandardMove} from '@app/engine/standard-move';
import {CoreService} from '@app/core/core.service';


@Injectable()
export class GameService implements OnDestroy {

    private currentGame: Game;
    private currentMove: Move;
    private currentMove$: Subscription;
    private currentPlayer: Player;

    private finishSubscription: Subscription;
    private finishAnnounceSource = new Subject<boolean>();
    finishAnnounce$ = this.finishAnnounceSource.asObservable();

    constructor(private coreService: CoreService) {
        this.coreService.getCurrentGame().subscribe(game => {
            if (game !== null) {
                this.currentGame = game;
                this.currentGame.start();
                this.subscribeTo(this.currentGame);
            }
        });
    }

    ngOnDestroy(): void {
        this.unsubscribe();
        this.currentGame = null;
    }

    hasGame(): boolean {
        return this.currentGame !== undefined;
    }

    getCurrentMove(): Move {
        return this.currentMove;
    }

    getCurrentPlayer(): Player {
        return this.currentPlayer;
    }

    next() {
        this.currentGame.next();
    }

    getRankingList(): Player[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getRankings();
        }
        return null;
    }

    getMoves(): Move[] {
        if (this.currentGame !== undefined) {
            return this.currentGame.getMoves();
        }
        return null;
    }

    // restore the game from local storage
    restore() {
        this.unsubscribe();
        // const gameJSON = JSON.parse(this.coreService.loadGame());
        // if (gameJSON.gameType === GameType.Standard) {
        //     this.currentGame = StandardGame.fromJSON(gameJSON);
        //     this.subscribeTo(this.currentGame);
        // }
    }

    private subscribeTo(game: Game) {
        this.currentMove$ = game.getCurrentMove().subscribe(move => {
            if (game instanceof StandardGame) {
                this.currentMove = <StandardMove>move;
            }
            this.currentPlayer = game.getPlayer(this.currentMove.playerId);
        });
        this.finishSubscription = game.isFinished().subscribe(val => {
            this.unsubscribe();
            this.finishAnnounceSource.next(val);
        });
    }

    private unsubscribe() {
        if (this.currentMove$ !== undefined) {
            this.currentMove$.unsubscribe();
        }
        if (this.finishSubscription !== undefined) {
            this.finishSubscription.unsubscribe();
        }
    }
}
