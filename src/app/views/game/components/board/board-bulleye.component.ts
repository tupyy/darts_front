import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Point} from './point';

@Component({
    selector: '[app-bullseye-component]',
    templateUrl: './board-bulleye.component.html',
    styleUrls: ['./board-bulleye.component.css']
})
export class BoardBulleyeComponent implements OnInit {
    @Input() center: Point;
    @Input() radius: number;
    @Input() color: string;
    @Input() value: number;

    @Output() shootScore = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onClick() {
        this.shootScore.emit(this.value);
    }
}
