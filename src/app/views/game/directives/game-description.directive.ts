import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[gameDescriptionComponent]',
})
export class GameDescriptionDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
