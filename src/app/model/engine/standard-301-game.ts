import {AbstractGame} from '@app/engine/abstract-game';
import {Game, GameJSON, Move} from '@app/engine/game';
import {GameType} from '@app/engine/game-type';
import {Player} from '@app/engine/player';

/**
 *  This class implements a standard 301 points game. The difference between classic 301 points game is that
 *  the game can end without a double or a bulls-eye. The first player to reach 0 wins.
 */
export class Standard301Game extends AbstractGame {

    gameType = GameType.Standard_301;

    constructor(players: Player[]) {
        super(players);
        players.forEach(player => {
            player.setTemporaryScore(301);
            player.commitScore();
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
        const moveScore = currentMove.getTotalScore();
        if (oldScore - moveScore > 0) {
            player.setTemporaryScore(oldScore - moveScore);
        }
    }


}
