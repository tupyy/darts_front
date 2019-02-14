/**
 * Shoot type enum. It defines if a shoot is a double, triple or bullseye shoot
 */
export enum ShootType {
    NORMAL = 0,
    DOUBLE,
    TRIPLE,
    HALF_BULLSEYE,
    BULLSEYE
}

/**
 * Interface for shoot objects
 */
export interface Shoot {
    value: number;
    type: ShootType;
    id: string;
}

/**
 * It holds the value and the type of a "shoot"
 */
export class ShootImpl implements Shoot {
    type: ShootType;
    value: number;
    id: string;

    constructor(value: number, type?: ShootType) {
        this.value = value;
        this.id = this.generateID();
        if (type === undefined) {
            this.type = ShootType.NORMAL;
        } else {
            this.type = type;
        }
    }

    private generateID() {
        return (Math.random() + 1).toString(36).substring(2, 6);
    }
}
