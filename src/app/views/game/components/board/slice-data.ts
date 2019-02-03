import {Point} from './point';

export enum SliceType {
    full= 0,
    reduced= 1
}

export class SliceData {
    type: SliceType;
    center: Point;
    startAngle: number;
    colorScheme: number;
    externalRadius: number;
    internalRadius: number;
}
