import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
    winner: string;
}

@Component({
    selector: 'app-game-finish-announce',
    templateUrl: './game-finish-announce.component.html',
    styleUrls: ['./game-finish-announce.component.css']
})
export class GameFinishAnnounceComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<GameFinishAnnounceComponent>,
                @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    ngOnInit() {
    }
}
