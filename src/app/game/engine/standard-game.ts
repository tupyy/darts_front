import {Player} from './player';
import {Move} from './move';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Game} from './game';
import {StandardMove} from './standard-move';
import {StandardPlayer} from './standard-player';
import {GameType} from './game-type';

export class StandardGame implements Game {

    public players: StandardPlayer[];
    public moves: Move[] = [];

    //  used when stringify to json
    public gameType: number = GameType.Standard;

    private currentMove: StandardMove;

    private currentMoveSource = new BehaviorSubject<StandardMove>(null);
    private currentPlayerSource = new BehaviorSubject<StandardPlayer>(null);

    private finishAnnouncedSource = new Subject<boolean>();
    private finishAnnounced$ = this.finishAnnouncedSource.asObservable();

    constructor(players: StandardPlayer[]) {
        this.players = players;
        this.currentMove = new StandardMove(1, this.players[0].id);
        this.currentMoveSource.next(this.currentMove);
        this.currentPlayerSource.next(<StandardPlayer>this.getPlayer(this.currentMove.playerId));
    }

    /**
     * Create an object StandardGame from json
     * @param gameJSON json describing the game
     */
    static fromJSON(gameJSON: Game): StandardGame {
        return undefined;
    }

    public next(): void {
        // save the current move
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);
        currentPlayer.updateScore(this.currentMove.getTotalScore());

        if (currentPlayer.getScore() === 0) {
            this.finishAnnouncedSource.next(true);
        }

        this.currentMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        this.currentMoveSource.next(this.currentMove);
        this.currentPlayerSource.next(<StandardPlayer>this.getPlayer(this.currentMove.playerId));
    }

    public prev(): Move {
        return null;
    }

    public isFinished(): Observable<boolean> {
        return this.finishAnnounced$;
    }

    public getCurrentMove(): Observable<StandardMove> {
        return this.currentMoveSource.asObservable();
    }

    public getCurrentPlayer(): Observable<StandardPlayer> {
        return this.currentPlayerSource.asObservable();
    }

    public getPlayers() {
        return this.players;
    }

    /**
     * Sort the moves by id before return
     */
    public getMoves() {
        return this.moves.sort((move1, move2) => {
            if (move1.id > move2.id) {
                return 1;
            }

            if (move1.id < move2.id) {
                return -1;
            }

            return 0;
        });
    }

    /**
     * Get move by id
     * @param id of the move
     */
    public getMove(id: number): Move {
        for (const m of this.moves) {
            if (m.id === id) {
                return m;
            }
        }
        return null;
    }

    public getPlayer(id: number): Player {
        for (let i = 0; i <= this.players.length; i++) {
            if (this.players[i].id === id) {
                return this.players[i];
            }
        }
    }

    /**
     * Get the rankings list. Return the list of player sorted in a decreasing order
     */
    public getRankings(): Player[] {
        return this.players.sort((player1, player2) => {
            if (player1.getScore() > player2.getScore()) {
                return 1;
            }

            if (player1.getScore() < player2.getScore()) {
                return -1;
            }

            return 0;
        });
    }

    toJSON(): Game {
        const targetObj = {};
        targetObj['players'] = this.players;
        targetObj['moves'] = this.moves;
        targetObj['gameType'] = this.gameType;
        return <Game>targetObj;
    }

    private getNextPlayer() {
        const id = this.currentMove.playerId + 1;
        if (id === this.players.length) {
            return this.getPlayer(0);
        } else {
            return this.getPlayer(id);
        }
    }


}
