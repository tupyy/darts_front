import {BoardComponent} from './board.component';
import {SliceData, SliceType} from './slice-data';
import {Point} from './point';
import {Component} from '@angular/core';

@Component({
    selector: 'app-full-board-component',
    templateUrl: './full-board.component.html',
    styleUrls: ['./full-board.component.css']
})
export class FullBoardComponent extends BoardComponent {

    constructor() {
        super();
        for (let i = 0; i < 20; i++) {
            this.sliceData[i].type = SliceType.full;
            this.sliceData[i].center = new Point(300, 300);
            this.sliceData[i].externalRadius = 270;
            this.sliceData[i].internalRadius = 20;
        }
    }
}
