import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Point} from './point';
import {SliceData, SliceType} from './slice-data';

@Component({
    selector: '[board-slice-component]',
    templateUrl: './board-slice.component.html',
    styleUrls: ['./board-slice.component.css']
})

export class BoardSliceComponent implements OnInit {

    @Input() data: SliceData;
    @Input() angle_gap = 1;
    @Input() width_ratio = 0.1;
    @Input() label: number;

    @Output() shootScore = new EventEmitter<number>();

    values = [];
    labelData = {
        'center': null,
        'rotationAngle': null
    };

    constructor() {
    }

    ngOnInit() {

        this.values[0] = {
            'width': this.width_ratio * this.data.externalRadius,
            'radius': (1 - this.width_ratio * 0.5) * this.data.externalRadius,
            'color': this.getColorScheme()[0]
        };

        this.values[1] = {
            'width': (0.5 - 1.5 * this.width_ratio) * this.data.externalRadius,
            'radius': (0.75 - 0.25 * this.width_ratio) * this.data.externalRadius,
            'color': this.getColorScheme()[1]
        };

        this.values[2] = {
            'width': this.width_ratio * this.data.externalRadius,
            'radius': 0.5 * this.data.externalRadius,
            'color': this.getColorScheme()[0]
        };

        if (this.data.type === SliceType.full) {
            this.values[3] = {
                'width': (0.5 - this.width_ratio * 0.5) * this.data.externalRadius - this.data.internalRadius,
                'radius': 0.5 * ((0.5 - this.width_ratio * 0.5) * this.data.externalRadius - this.data.internalRadius) + this.data.internalRadius,
                'color': this.getColorScheme()[1]
            };
        }

        this.labelData['center'] = this.polarToCartesian(this.data.center, this.data.externalRadius + 5, this.data.startAngle + 7);
        this.labelData['rotationAngle'] = this.data.startAngle + 9;

    }

    public onClick(index: number) {
        if (index === 0) {
            this.shootScore.emit(2 * this.label);
        } else if (index === 1 || index === 3) {
            this.shootScore.emit(this.label);
        } else if (index === 2) {
            this.shootScore.emit(this.label * 3);
        }
    }

    private getColorScheme() {
        return this.data.colorScheme === 0 ? ['red', 'black'] : ['green', '#e4e4e3'];
    }

    private createArc(radius: number) {
        return this.describeArc(this.data.center, radius, this.data.startAngle);
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
