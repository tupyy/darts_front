// TODO rename to "turn"
import {EventEmitter} from '@angular/core';

export interface Move {

    /**
     * Id
     */
    id: number;

    /**
     * The id the player who played this turn
     */
    playerId: number;

    /**
     * The value of the three shoots
     */
    shoots: number[];

    /**
     * Event to be emitted when a shoot score is changed
     */
    hasChanged: EventEmitter<number>;

    /**
     * Get the score of a shoot id
     * @param shootId shoot id
     */
    getScore(shootId: number): number;

    /**
     * Set the score
     * @param shootId shoot id
     * @param value value
     */
    setScore(shootId: number, value: number);

    /**
     * Get total score
     */
    getTotalScore(): number;

    /**
     * Clone the current turn
     */
    clone(): Move;

    /**
     * Serialize to json
     */
    toJSON(): Move;

    /**
     * Deserialize from json
     * @param moveJSON json to serialize from
     */
    fromJSON(moveJSON): Move;
}

