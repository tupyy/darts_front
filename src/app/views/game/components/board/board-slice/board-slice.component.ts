import {Component, Input, OnInit} from '@angular/core';
import {Point} from '../point';

const ANGLE_GAP = 1;
const WIDTH_RATIO = 0.1;

@Component({
    selector: '[app-board-slice]',
    templateUrl: './board-slice.component.html',
    styleUrls: ['./board-slice.component.css']
})

export class BoardSliceComponent implements OnInit {

    @Input() center: Point;
    @Input() radius: number[];
    @Input() startAngle: number;

    values = [];

    constructor() {
    }

    ngOnInit() {
        this.values[0] = {
            'width': WIDTH_RATIO * this.radius[0],
            'radius': (1 - WIDTH_RATIO * 0.5) * this.radius[0],
            'color': 'red'
        };

        this.values[1] = {
            'width': (0.5 - 1.5 * WIDTH_RATIO) * this.radius[0],
            'radius': (0.75 - 0.25 * WIDTH_RATIO) * this.radius[0],
            'color': 'green'
        };

        this.values[2] = {
            'width': WIDTH_RATIO * this.radius[0],
            'radius': 0.5 * this.radius[0],
            'color': 'blue'
        };

        this.values[3] = {
            'width': (0.5 - WIDTH_RATIO * 0.5) * this.radius[0] - this.radius[1],
            'radius': 0.5 * ((0.5 - WIDTH_RATIO * 0.5) * this.radius[0] - this.radius[1]) + this.radius[1],
            'color': 'darkmagenta'
        };
    }

    private createArc(radius: number) {
        return this.describeArc(this.center, radius, this.startAngle);
    }

    private describeArc(center: Point, radius, startAngle) {
        let direction_gap = 0;
        if (startAngle % 2 === 0) {
            direction_gap = -1;
        } else {
            direction_gap = 1;
        }

        startAngle += direction_gap * ANGLE_GAP;
        const endAngle = startAngle + 360 / 20 - 2 * ANGLE_GAP * direction_gap;
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
