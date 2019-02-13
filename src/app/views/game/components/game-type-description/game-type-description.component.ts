import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GameType, GameTypeDescription} from '@app/model/game-type';

@Component({
    selector: 'app-game-type-description',
    templateUrl: './game-type-description.component.html',
    styleUrls: ['./game-type-description.component.css']
})
export class GameTypeDescriptionComponent implements OnInit, OnChanges {

    @Input() gameType: GameType;
    public showDescription = false;
    public gameTypeDescriptionContent: string;
    private gameTypeName: string;

    private gameTypeDescription = new GameTypeDescription();

    constructor() {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.showDescription = true;
        this.gameTypeDescriptionContent = this.gameTypeDescription.getDescription(this.gameType);
        this.gameTypeName = this.gameTypeDescription.getGameType(this.gameType);
    }

}
