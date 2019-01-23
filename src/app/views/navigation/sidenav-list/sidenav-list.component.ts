import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {AuthService} from '../../../core/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();

    userAuthenticated: boolean;
    constructor(private authService: AuthService,
                private router: Router) {
        authService.isAuthenticated.subscribe(val => {
            this.userAuthenticated = val;
        });
    }

    ngOnInit() {
    }

    public onSidenavClose() {
        this.sidenavClose.emit();
    }

    public onLogout() {
        this.authService.logout();
        this.router.navigate(['/']);
        this.sidenavClose.emit();
    }

}
