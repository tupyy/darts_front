import {Player, StandardPlayer} from './player';
import {Move, StandardMove} from './move';
import {Observable, Subject} from 'rxjs';

export {Player} from './player';
export {Move} from './move';

export interface Game {
    players: Player[];
    moves: Move[];

    // go to next move
    next(): Move;

    // go the the prev move
    prev(): Move;

    // announce when the main-component is finished
    isFinished(): Observable<boolean>;

    // get the current move
    getCurrentMove(): Move;

    getCurrentPlayer(): Player;

    // get move
    getMove(id: number): Move;

    getMoves(): Move[];

    // get player by id
    getPlayer(id: number): Player;

    // get ranking list
    getRankings(): Player[];

}

export class StandardGame implements Game {
    public players: StandardPlayer[];
    public moves: Move[] = [];

    private currentMove: StandardMove;
    private finishAnnouncedSource = new Subject<boolean>();
    private finishAnnounced$ = this.finishAnnouncedSource.asObservable();

    constructor(players: StandardPlayer[]) {
        this.players = players;
        this.currentMove = new StandardMove(1, this.players[0].id);
    }

    public next(): Move {
        // save the current move
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);
        currentPlayer.updateScore(this.currentMove.getTotalScore());

        if (currentPlayer.getScore() === 0) {
            this.finishAnnouncedSource.next(true);
        }

        this.currentMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        return this.currentMove;
    }

    public prev(): Move {
        return null;
    }

    public isFinished(): Observable<boolean> {
        return this.finishAnnounced$;
    }

    public getCurrentMove(): Move {
        return this.currentMove;
    }

    public getCurrentPlayer(): Player {
        return this.getPlayer(this.currentMove.playerId);
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

    private getNextPlayer() {
        const id = this.currentMove.playerId + 1;
        if (id === this.players.length) {
            return this.getPlayer(0);
        } else {
            return this.getPlayer(id);
        }
    }


}
