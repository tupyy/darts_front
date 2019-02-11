import {Player} from './player';
import {Move} from './move';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Game, GameJSON} from './game';
import {StandardMove} from './standard-move';
import {StandardPlayer} from './standard-player';
import {GameType} from '@app/engine/game-type';

export abstract class AbstractGame implements Game {

    public players: Player[];
    public moves: Move[] = [];
    public id: string;

    //  used when stringify to json
    public abstract gameType: number;

    private currentMove: Move;

    private currentMoveSource = new BehaviorSubject<Move>(null);
    private currentPlayerSource = new BehaviorSubject<StandardPlayer>(null);

    private finishAnnouncedSource = new Subject<boolean>();

    protected constructor(players: Player[]) {
        this.players = players;
        this.id = this.generateID();
    }

    /**
     * Create an object AbstractGame from json
     * @param gameJSON json describing the game
     */
    public abstract fromJSON(gameJSON: GameJSON): Game;

    /**
     * Serialize the game
     */
    public abstract toJSON();

    public start() {
        const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        this.setCurrentMove(newMove);
    }

    /**
     * Update the player score
     * @param player to be updated
     * @param currentMove the move used to update the player score
     */
    public abstract updatePlayerScore(player: Player, currentMove: Move);

    /**
     * Check if the game is finished
     * @param currentPlayer current player
     * @param currentMove current move
     */
    public abstract isGameFinished(currentPlayer: Player, currentMove: Move);

    public next(): void {
        // save the current move
        this.currentMove.hasChanged.unsubscribe();
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);

        // update score
        this.updatePlayerScore(currentPlayer, this.currentMove);
        currentPlayer.commitScore();
        if (this.isGameFinished(currentPlayer, this.currentMove)) {
            this.finishAnnouncedSource.next(true);
        } else {
            const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
            this.setCurrentMove(newMove);
        }
    }


    public isFinished(): Observable<boolean> {
        return this.finishAnnouncedSource.asObservable();
    }

    /**
     * Return an observable which gives the current move
     */
    public getCurrentMove(): Observable<Move> {
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

    public getGameType(): GameType {
        return this.gameType;
    }

    /**
     * Get the next player by id order
     */
    protected getNextPlayer() {
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

    private setCurrentMove(move: Move) {
        this.currentMove = move;
        this.currentMove.hasChanged.subscribe(val => {
            const player = this.getPlayer(this.currentMove.playerId);
            this.updatePlayerScore(player, this.currentMove);
        });

        this.currentMoveSource.next(move);
        this.currentPlayerSource.next(<StandardPlayer>this.getPlayer(move.playerId));
    }

    private generateID() {
        return (Math.random() + 1).toString(36).substring(2, 12);
    }


}
