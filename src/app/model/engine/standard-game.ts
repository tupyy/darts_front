import {AbstractGame} from '@app/engine/abstract-game';
import {Game} from '@app/engine/game';
import {GameType} from '@app/engine/game-type';
import {StandardPlayer} from '@app/engine/standard-player';
import {GameJSON} from '@app/engine/game';
import {Player} from '@app/engine/player';
import {Move} from '@app/engine/game';

/**
 *  This class implements a standard 301 points game. The difference between classic 301 points game is that
 *  the game can end without a double or a bulls-eye. The first player to reach 0 wins.
 */
export class StandardGame extends AbstractGame {

    gameType = GameType.Standard;

    constructor(players: StandardPlayer[]) {
        super(players);
        players.forEach(player => {
            player.setScore(301);
        });
    }

    // TODO implement
    fromJSON(gameJSON: GameJSON): Game {
        return undefined;
    }

    /**
     * The first player to reach 0 wins.
     * @param currentPlayer
     * @param currentMove
     */
    isGameFinished(currentPlayer: Player, currentMove: Move) {
        return currentPlayer.getScore() === 0;
    }

    // TODO implement
    toJSON(): Game {
        return undefined;
    }

    updatePlayerScore(player: Player, currentMove: Move) {
        const oldScore = player.getScore();
        currentMove.shoots.forEach(shootValue => {
            if (player.getScore() - shootValue >= 0) {
                player.setScore(player.getScore() - shootValue);
            } else {
                player.setScore(oldScore);
                return;
            }
        });
    }


}
