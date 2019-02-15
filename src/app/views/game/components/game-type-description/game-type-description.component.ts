import {
    AfterViewInit,
    Component,
    ComponentFactoryResolver,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {GameType} from '@app/model/game-type';
import {GameDescriptionDirective} from '../../directives/game-description.directive';
import {Standard501DescriptionComponent} from './standard-501-description.component';
import {Standard301DescriptionComponent} from './standard-301-description.component';

@Component({
    selector: 'app-game-type-description',
    templateUrl: './game-type-description.component.html',
    styleUrls: ['./game-type-description.component.css']
})
export class GameTypeDescriptionComponent implements OnInit, OnChanges {

    @Input() gameType: GameType;
    public showDescription = false;
    private gameTypeName: string;

    @ViewChild(GameDescriptionDirective) gameDescriptionComponent: GameDescriptionDirective;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.gameType !== undefined) {
            this.showDescription = true;
            this.gameTypeName = this.getGameType(this.gameType);
            this.loadComponent(this.gameType);
        }

    }

    private loadComponent(componentType: GameType) {
        switch (componentType) {
            case GameType.Standard_301: {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(Standard301DescriptionComponent);
                const viewContainerRef =  this.gameDescriptionComponent.viewContainerRef;
                viewContainerRef.clear();
                const componentRef = viewContainerRef.createComponent(componentFactory);
                break;
            }
            case GameType.Standard_501: {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(Standard501DescriptionComponent);
                const viewContainerRef =  this.gameDescriptionComponent.viewContainerRef;
                viewContainerRef.clear();
                const componentRef = viewContainerRef.createComponent(componentFactory);
                break;
            }

        }
    }

    private getGameType(gameType: GameType): string {
        const re = /_/gi;
        let gameTypeStr: string = GameType[gameType];
        gameTypeStr = gameTypeStr.replace(re, ' ');
        return gameTypeStr.charAt(0).toUpperCase() + gameTypeStr.slice(1);
    }



}
