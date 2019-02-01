import {Component, OnInit} from '@angular/core';
import {Point} from './point';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    center = new Point(300, 300);
    inputData: number[][] = [];

    constructor() {
        let j = 0;
        let oddSlice = false;
        for (let i = -9; i <= 351; i = i + 18) {
            this.inputData[j] = [oddSlice ? 1 : 0, i];
            oddSlice = !oddSlice;
            j++;
        }
    }

    ngOnInit() {
    }

}
