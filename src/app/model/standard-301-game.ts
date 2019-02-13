import {AbstractGame} from './abstract-game';
import {Game, GameJSON, Move} from './game';
import {GameType} from './game-type';
import {Player} from './player';
import {StandardPlayer} from '@app/model/standard-player';
import {StandardMove} from '@app/model/standard-move';

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
     * @param currentPlayer current player
     * @param currentMove current move
     */
    isGameFinished(currentPlayer: Player, currentMove: Move) {
        const lastValue = this.getLastShootValue(currentMove);
        return currentPlayer.getTemporaryScore() === 0 && lastValue % 2 === 0 && lastValue % 3 !== 0;
    }

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

    updatePlayerScore(player: Player, currentMove: Move) {
        const oldScore = player.getScore();
        const moveScore = currentMove.getTotalScore();
        player.setTemporaryScore(oldScore - moveScore);
    }

    private isBust(currentPlayer: Player) {
        return currentPlayer.getTemporaryScore() < 0 || currentPlayer.getTemporaryScore() === 1;
    }

    private getLastShootValue(currentMove: Move) {
        let lastValue = 0;
        currentMove.shoots.forEach(val => {
            if (val !== 0) {
                lastValue = val;
            }
        });

        return lastValue;
    }


}
