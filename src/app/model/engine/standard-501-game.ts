import {StandardGame} from '@app/engine/standard-game';
import {Player} from '@app/engine/player';
import {GameType} from '@app/engine/game-type';

export class Standard501Game extends StandardGame {

    gameType = GameType.Standard_501;

    constructor(players: Player[]) {
        super(players);
        players.forEach(player => {
            player.setScore(501);
        });
    }
}
