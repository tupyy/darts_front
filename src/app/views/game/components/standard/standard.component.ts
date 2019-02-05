import {BehaviorSubject, Observable} from 'rxjs';

export abstract class StandardComponent {

    protected canNext$ = new BehaviorSubject<boolean>(false);

    constructor() {
    }

    public abstract reset();

    public abstract onNext();


    public canNext(): Observable<boolean> {
        return this.canNext$.asObservable();
    }
}
