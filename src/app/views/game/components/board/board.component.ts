import {Point} from './point';
import {SliceData} from './slice-data';


export class BoardComponent {
    protected center = new Point(300, 300);
    protected sliceData: SliceData[] = [];
    protected angle_gap = 0;
    protected width_ratio = 0.1;

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
}
