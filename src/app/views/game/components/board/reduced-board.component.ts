import {BoardComponent} from './board.component';
import {Component, OnInit} from '@angular/core';
import {Point} from './point';
import {SliceType} from './slice-data';

@Component({
    selector: 'app-reduced-board',
    templateUrl: './reduced-board.component.html',
    styleUrls: ['./reduced-board.component.css']
})
export class ReducedBoardComponent extends BoardComponent implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.angle_gap = 1;
        this.width_ratio = 0.2;
        for (let i = 0; i < 20; i++) {
            this.sliceData[i].type = SliceType.reduced;
            this.sliceData[i].center = new Point(300, 300);
            this.sliceData[i].externalRadius = 270;
            this.sliceData[i].internalRadius = 20;
        }
    }
}
