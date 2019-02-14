// TODO rename to "turn"
import {EventEmitter} from '@angular/core';
import {Shoot} from './shoot';

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
    shoots: Shoot[];

    /**
     * Event to be emitted when a shoot score is changed
     */
    hasChanged: EventEmitter<string>;

    /**
     * Get the score of a shoot id
     * @param shootId shoot id
     */
    getScore(shootId: string): number;

    /**
     * Set the score
     * @param shoot shoot object
     */
    addShoot(shoot: Shoot);

    /**
     * Remove shoot
     * @param shootId shoot id
     */
    removeShoot(shootId: string);

    /**
     * Remove all shoots
     */
    removeAll();

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

