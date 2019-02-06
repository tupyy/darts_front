export interface Player {
    id: number;
    name: string;
    getScore(): number;
    updateScore(moveScore: number);
    commitScore();
    getCurrentMoveScore();
}




