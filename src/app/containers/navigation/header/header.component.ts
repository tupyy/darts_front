import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {GameService} from '../../../game/services/game.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output() public sidenavToggle = new EventEmitter();
    userAuthenticated: boolean;

    constructor(private authService: AuthService,
                private router: Router,
                private gameService: GameService) {
        authService.isAuthenticated.subscribe(val => {
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
        return this.gameService.hasGame();
    }

    onRestore() {
        this.router.navigate(['/game/play/restore']);
    }

    public onLogout() {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}
