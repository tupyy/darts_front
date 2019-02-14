import {AbstractGame} from './abstract-game';
import {Game, GameJSON, Move} from './game';
import {GameType} from './game-type';
import {Player} from './player';

/**
 *  This class implements a standard 301 points game. The difference between classic 301 points game is that
 *  the game can end without a double or a bulls-eye. The first player to reach 0 wins.
 */
export class Simple301Game extends AbstractGame {

    gameType = GameType.Simple_301;

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
     * The first player to reach 0 wins. It doesn't take into account if the last shoot is a double.
     */
    isGameFinished(currentPlayer: Player, currentMove: Move) {
        return currentPlayer.getScore() === 0;
    }

    // TODO implement
    toJSON(): Game {
        return undefined;
    }

    /**
     * Update the player temporary score when the current move score changes
     */
    updatePlayerScore(player: Player, currentMove: Move) {
        const oldScore = player.getScore();
        const moveScore = currentMove.getTotalScore();
        player.setTemporaryScore(oldScore - moveScore);
    }


}
