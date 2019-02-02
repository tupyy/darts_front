import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../point';

@Component({
    selector: '[app-board-slice]',
    templateUrl: './board-slice.component.html',
    styleUrls: ['./board-slice.component.css']
})

export class BoardSliceComponent implements OnInit {

    @Input() center: Point;
    @Input() radius: number[];
    @Input() startAngle: number;
    @Input() colorScheme: number;

    values = [];

    private angle_gap = 1;
    private width_ratio = 0.1;

    constructor() {
    }

    ngOnInit() {

        this.values[0] = {
            'width': this.width_ratio * this.radius[0],
            'radius': (1 - this.width_ratio * 0.5) * this.radius[0],
            'color': this.getColorScheme()[0]
        };

        this.values[1] = {
            'width': (0.5 - 1.5 * this.width_ratio) * this.radius[0],
            'radius': (0.75 - 0.25 * this.width_ratio) * this.radius[0],
            'color': this.getColorScheme()[1]
        };

        this.values[2] = {
            'width': this.width_ratio * this.radius[0],
            'radius': 0.5 * this.radius[0],
            'color': this.getColorScheme()[0]
        };

        this.values[3] = {
            'width': (0.5 - this.width_ratio * 0.5) * this.radius[0] - this.radius[1],
            'radius': 0.5 * ((0.5 - this.width_ratio * 0.5) * this.radius[0] - this.radius[1]) + this.radius[1],
            'color': this.getColorScheme()[1]
        };
    }

    public onClick(index: number) {
        console.log(index);
    }

    private getColorScheme() {
        return this.colorScheme === 0 ? ['red', 'black'] : ['green', '#e4e4e3'];
    }

    private createArc(radius: number) {
        return this.describeArc(this.center, radius, this.startAngle);
    }

    private describeArc(center: Point, radius, startAngle) {
        startAngle += this.angle_gap;
        const endAngle = startAngle + 360 / 20 - 2 * this.angle_gap;
        const start = this.polarToCartesian(center, radius, endAngle);
        const end = this.polarToCartesian(center, radius, startAngle);

        const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

        return [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');
    }

    private polarToCartesian(center: Point, radius: number, angleInDegrees: number): Point {
        const _point = new Point(0, 0);

        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

        _point.x = center.x + (radius * Math.cos(angleInRadians));
        _point.y = center.y + (radius * Math.sin(angleInRadians));
        return _point;
    }
}
