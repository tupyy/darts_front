import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[app-play-component]',
})
export class PlayComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
