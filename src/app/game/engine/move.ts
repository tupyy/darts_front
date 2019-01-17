export interface Move {
    id: number;
    playerId: number;

    clone(): Move;
}

