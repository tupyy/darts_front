import {Player} from './player';
import {Move} from './move';
import {Observable} from 'rxjs';

export {Player} from './player';
export {Move} from './move';

export interface Game {
    players: Player[];
    moves: Move[];
    gameType: number;
    id: string;

    /**
     * Start the game
     */
    start();

    /**
     * Advance the game with one move.
     */
    next(): void;

    /**
     * announce when the main-component is finished
     */
    isFinished(): Observable<boolean>;

    /**
     * Get the current move observable
     */
    getCurrentMove(): Observable<Move>;

    /**
     * Get current player observable
     */
    getCurrentPlayer(): Observable<Player>;

    /**
     * Get move
     * @param id of the move
     */
    getMove(id: number): Move;

    /**
     * Get all the moves
     */
    getMoves(): Move[];

    // get player by id
    getPlayer(id: number): Player;

    // get ranking list
    getRankings(): Player[];

    /**
     * Serialize to json
     */
    toJSON(): Game;

    /**
     * Deserialize from json
     * @param gameJSON
     */
    fromJSON(gameJSON: GameJSON): Game;
}

export interface GameJSON extends Game {
    currentPlayerID: number;
}

