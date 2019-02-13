import {AbstractGame} from './abstract-game';
import {Game, GameJSON, Move} from './game';
import {GameType} from './game-type';
import {Player} from './player';
import {StandardMove, StandardPlayer} from '@app';

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
     * The game is finished if the last shoot value is a double and the total score is 0
     * @param currentPlayer
     * @param currentMove
     */
    isGameFinished(currentPlayer: Player, currentMove: Move) {
        let lastValue = 0;
        currentMove.shoots.forEach(val => {
            if (val !== 0) {
                lastValue = val;
            }
        });

        return currentMove.getTotalScore() && lastValue % 2 === 0;
    }

    next() {
        // save the current move
        this.currentMove.hasChanged.unsubscribe();
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);

        // update score
        this.updatePlayerScore(currentPlayer, this.currentMove);
        currentPlayer.commitScore();
        if (this.isGameFinished(currentPlayer, this.currentMove)) {
            this.finishAnnouncedSource.next(true);
        } else {
            const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
            this.setCurrentMove(newMove);
        }
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
