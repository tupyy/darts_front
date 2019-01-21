import {Player} from './player';
import {Move} from './move';
import {ArgumentOutOfRangeError, BehaviorSubject, Observable, Subject} from 'rxjs';
import {Game, GameJSON} from './game';
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
        this.start();
    }

    /**
     * Create an object StandardGame from json
     * @param gameJSON json describing the game
     */
    static fromJSON(gameJSON: GameJSON): StandardGame {
        const players = [];
        for (const playerJSON of gameJSON.players) {
            players.push(StandardPlayer.fromJSON(playerJSON));
        }

        const newGame = new StandardGame(players);
        for (const moveJSON of gameJSON.moves) {
            newGame.moves.push(StandardMove.fromJSON(moveJSON));
        }
        const currentPlayer = <StandardPlayer>newGame.getPlayer(gameJSON.currentPlayerID);
        newGame.currentPlayerSource.next(currentPlayer);
        return newGame;
    }

    public start() {
        const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        this.setCurrentMove(newMove);
    }

    public next(): void {
        // save the current move
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);
        currentPlayer.updateScore(this.currentMove.getTotalScore());

        if (currentPlayer.getScore() === 0) {
            this.finishAnnouncedSource.next(true);
        }

        const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        this.setCurrentMove(newMove);
    }

    public prev(): Move {
        return null;
    }

    /**
     * Resume the game from a move at rank moveID.
     * TODO delete all the moves after the moveID
     * @param moveID the rank of the move from where the game is resumed
     */
    resume(moveID: number): void {
        if (moveID >= this.moves.length) {
            throw new ArgumentOutOfRangeError();
        }
        for (const move of this.moves) {
            if (moveID === moveID) {
                this.setCurrentMove(<StandardMove>move);
                return;
            }
        }
    }

    public isFinished(): Observable<boolean> {
        return this.finishAnnounced$;
    }

    /**
     * Return an observable which gives the current move
     */
    public getCurrentMove(): Observable<StandardMove> {
        return this.currentMoveSource.asObservable();
    }

    /**
     * Return an observable which gives the current player
     */
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
        targetObj['currentPlayerID'] = this.getNextPlayer().id;
        return <Game>targetObj;
    }

    private setCurrentMove(move: StandardMove) {
        this.currentMove = move;
        this.currentMoveSource.next(move);
        this.currentPlayerSource.next(<StandardPlayer>this.getPlayer(move.playerId));
    }

    private getNextPlayer() {
        if (this.currentMove === undefined) {
            return this.getPlayer(0);
        }
        const id = this.currentMove.playerId + 1;
        if (id === this.players.length) {
            return this.getPlayer(0);
        } else {
            return this.getPlayer(id);
        }
    }


}
