/**
 * Interface for player implementation
 */
export interface Player {
    id: number;
    name: string;

    /**
     * Get the temporary score. If the score has been committed it will return the committed score
     */
    getScore(): number;

    /**
     * Set the temporary turn score. It can be reset.
     * @param newScore new score
     */
    setScore(newScore: number);

    /**
     * Set a temporary score. It represents the core of the current move.
     * @param newScore new temporary score
     */
    setTemporaryScore(newScore: number);

    /**
     * Get the temporary score
     */
    getTemporaryScore(): number;

    /**
     * It set the final score of the move.
     * Normally it is called on the next method of the game
     */
    commitScore();
}




