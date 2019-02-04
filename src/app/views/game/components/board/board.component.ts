import {Point} from './point';
import {SliceData} from './slice-data';
import {EventEmitter, Output} from '@angular/core';


export class BoardComponent {
    protected center = new Point(300, 300);
    public sliceData: SliceData[] = [];
    protected angle_gap = 0;
    protected width_ratio = 0.1;
    protected boardNumbersOrder = [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5];

    @Output() scoredChanged = new EventEmitter<number>();

    constructor() {
        let j = 0;
        let oddSlice = false;
        for (let i = -9; i < 351; i = i + 18) {
            const _sliceData = new SliceData();
            _sliceData.colorScheme = oddSlice ? 1 : 0;
            _sliceData.startAngle = i;
            oddSlice = !oddSlice;
            this.sliceData[j] = _sliceData;
            j++;
        }
    }

    public onShootChange(value: number) {
        this.scoredChanged.emit(value);
    }
}
