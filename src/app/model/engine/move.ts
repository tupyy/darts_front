// TODO rename to "turn"
export interface Move {
    id: number;
    playerId: number;
    shoots: number[];

    clone(): Move;
}

