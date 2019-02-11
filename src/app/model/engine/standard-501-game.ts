import {StandardGame} from '@app/engine/standard-game';
import {Player} from '@app/engine/player';

export class Standard501Game extends StandardGame {

    constructor(players: Player[]) {
        super(players);
        players.forEach(player => {
            player.setScore(501);
        });
    }
}
