import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
    selector: '[appPlayComponent]',
})
export class PlayComponentDirective {
    constructor(public viewContainerRef: ViewContainerRef) {
    }
}
