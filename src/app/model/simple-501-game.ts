import {AbstractGame} from './abstract-game';
import {Game, GameJSON, Move} from './game';
import {GameType} from './game-type';
import {Player} from './player';

/**
 *  This class implements a standard 301 points game. The difference between classic 301 points game is that
 *  the game can end without a double or a bulls-eye. The first player to reach 0 wins.
 */
export class Simple501Game extends AbstractGame {

    gameType = GameType.Simple_501;

    constructor(players: Player[]) {
        super(players);
        players.forEach(player => {
            player.setTemporaryScore(501);
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