export enum GameType {
    Standard_301,
    Standard_501,
    Simple_301,
    Simple_501
}

export class GameTypeDescription {
    description = {
        'standard_301': 'The objective is to reduce a fixed score, 301 , to zero ("checking out"). ' +
                        'The final dart must land in either the bullseye or a double segment in order to win.',
        'standard_501': 'The objective is to reduce a fixed score, 501 , to zero ("checking out"). ' +
                        'The final dart must land in either the bullseye or a double segment in order to win.',
        'simple_301': 'The objective is to reduce a fixed score, 301 , to zero ("checking out").',
        'simple_501': 'The objective is to reduce a fixed score, 501 , to zero ("checking out").'
    };

    constructor() {
    }

    /**
     * Return the descripton of the game type
     * @param gameType game type enum value
     */
    getDescription(gameType: GameType): string {
        const gameTypeStr: string = GameType[gameType];
        if (gameTypeStr.toLowerCase() in this.description) {
            return this.description[gameTypeStr.toLowerCase()];
        }

        return null;
    }

    /**
     * Return the name of the game. It takes the enum value and it parsed to string.
     * @param gameType game type enum value
     */
    getGameType(gameType: GameType): string {
        const re = /_/gi;
        let gameTypeStr: string = GameType[gameType];
        gameTypeStr = gameTypeStr.replace(re, ' ');
        return gameTypeStr.charAt(0).toUpperCase() + gameTypeStr.slice(1);
    }
}
