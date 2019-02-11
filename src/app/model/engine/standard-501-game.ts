import {Standard301Game} from '@app/engine/engine/standard-301-game';
import {Player} from '@app/engine/player';
import {GameType} from '@app/engine/game-type';

export class Standard501Game extends Standard301Game {

    gameType = GameType.Standard_501;

    constructor(players: Player[]) {
        super(players);
        players.forEach(player => {
            player.setTemporaryScore(501);
            player.commitScore();
        });
    }
}
