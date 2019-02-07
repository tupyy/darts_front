import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '@app/core/auth.service';
import {Router} from '@angular/router';
import {CoreService} from '@app/core/core.service';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();

    userAuthenticated: boolean;
    constructor(private coreService: CoreService,
                private authService: AuthService,
                private router: Router) {
        authService.authenticationObservable.subscribe(val => {
            this.userAuthenticated = val;
        });
    }

    ngOnInit() {
    }

    public onSidenavClose() {
        this.sidenavClose.emit();
    }

    canRestoreGame(): boolean {
        return this.coreService.canRestoreGame();
    }

}
