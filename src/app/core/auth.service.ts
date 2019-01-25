import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User, UserToken} from '@app/engine/user';
import {BackendService} from './backend.service';
import {LocalStorageService} from './local-storage.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentToken: UserToken;

    constructor(private router: Router,
                private backEnd: BackendService,
                private localstorage: LocalStorageService) {
    }

    ngOnInit(): void {
        const userToken = this.localstorage.getToken();
        if (userToken !== undefined) {
            this.currentToken = userToken;
            this.backEnd.refreshToken().subscribe(authToken => {
                this.currentToken.access_token = authToken.access_token;
            });
        }
    }

    get authenticationObservable() {
        return this.loggedIn.asObservable();
    }

    public isAuthenticated(): boolean {
        return this.loggedIn.value;
    }

    login(user: User) {
        if (user.username !== '' && user.password !== '') {
            this.backEnd.login(user).subscribe(userToken => {
                this.currentToken = userToken;
                this.localstorage.saveToken(userToken);
                this.loggedIn.next(true);
                this.router.navigate(['/']);
            });
        }
    }

    logout() {
        this.backEnd.logout().subscribe(res => {
            this.currentToken = null;
            this.localstorage.removeToken();
            this.loggedIn.next(false);
        });
    }

    public getAuthorizationToken() {
        if (this.currentToken !== undefined) {
            return this.currentToken.access_token;
        }
        return null;
    }
}
