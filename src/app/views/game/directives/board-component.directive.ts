import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[app-board-component]',
})
export class BoardComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
