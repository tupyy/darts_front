import {AbstractGame} from './abstract-game';
import {Game, GameJSON, Move} from './game';
import {GameType} from './game-type';
import {Player} from './player';
import {StandardPlayer} from '@app/model/standard-player';
import {StandardMove} from '@app/model/standard-move';
import {ShootType} from '@app/model/shoot';

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
     */
    isGameFinished(currentPlayer: Player, currentMove: Move) {
        const lastShoot = this.getLastShootValue(currentMove);
        return currentPlayer.getTemporaryScore() === 0 && lastShoot.type === ShootType.DOUBLE;
    }

    /**
     * The current turn of the current player is finished. Proceed to the next move.
     * It checks if the current player won the game. If not, it creates a new move and retrieve the next player.
     */
    next() {
        // save the current move
        this.currentMove.hasChanged.unsubscribe();
        this.moves.push(this.currentMove.clone());
        const currentPlayer = <StandardPlayer>this.getPlayer(this.currentMove.playerId);

        if (currentPlayer.getTemporaryScore() === 0) {
            if (this.isGameFinished(currentPlayer, this.currentMove)) {
                this.finishAnnouncedSource.next(true);
            } else {
                currentPlayer.setTemporaryScore(currentPlayer.getScore());
            }
        } else if (this.isBust(currentPlayer)) {
            currentPlayer.setTemporaryScore(currentPlayer.getScore());
        }
        currentPlayer.commitScore();
        const newMove = new StandardMove(this.moves.length + 1, this.getNextPlayer().id);
        this.setCurrentMove(newMove);
    }

    // TODO implement
    toJSON(): Game {
        return undefined;
    }

    /**
     * Update the current player score
     * @param player current player
     */
    updatePlayerScore(player: Player, currentMove: Move) {
        const oldScore = player.getScore();
        const moveScore = currentMove.getTotalScore();
        player.setTemporaryScore(oldScore - moveScore);
    }

    /**
     * Check if the current move is not a bust.
     * A bust is either score < 0 or score = 1. A game has to be finished with a double so 1 cannot be scored with a double.
     */
    private isBust(currentPlayer: Player) {
        return currentPlayer.getTemporaryScore() < 0 || currentPlayer.getTemporaryScore() === 1;
    }

    /**
     * Get the last shoot of the current player.
     * @param currentMove
     */
    private getLastShootValue(currentMove: Move) {
        return currentMove.shoots[currentMove.shoots.length - 1];
    }


}
