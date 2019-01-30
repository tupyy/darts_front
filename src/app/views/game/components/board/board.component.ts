import {Component, OnInit} from '@angular/core';
import {Point} from './point';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
    center = new Point(300, 300);
    startAngles: number[] = [];

    constructor() {
        let j = 0;
        for (let i = -9; i <= 351; i = i + 18) {
            this.startAngles[j] = i;
            j++;
        }
    }

    ngOnInit() {
    }

}
