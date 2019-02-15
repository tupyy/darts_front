import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Point} from './point';
import {Shoot, ShootImpl, ShootType} from '@app/model/shoot';

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

    @Output() shootScore = new EventEmitter<Shoot>();

    constructor() {
    }

    ngOnInit(): void {
    }

    public onClick() {
        const shootType = this.value === 50 ? ShootType.BULLSEYE : ShootType.HALF_BULLSEYE;
        this.shootScore.emit(new ShootImpl(this.value, shootType));
    }
}
