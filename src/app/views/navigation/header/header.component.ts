import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '@app/core/index';
import {Router} from '@angular/router';
import {CoreService} from '@app/core/core.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() public sidenavToggle = new EventEmitter();
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

    public onToggleSidenav() {
        this.sidenavToggle.emit();
    }

    public onNewGame() {
        this.router.navigate(['game/new']);
    }

    canRestoreGame(): boolean {
        return this.coreService.canRestoreGame();
    }

    onRestore() {
        this.router.navigate(['/game/play/restore']);
    }
}
