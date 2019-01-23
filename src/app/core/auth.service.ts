import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User, UserToken} from '@app/engine/user';
import {BackendService} from './backend.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentToken: UserToken;

    get isAuthenticated() {
        return this.loggedIn.asObservable();
    }

    constructor(private router: Router,
                private backEnd: BackendService) {
    }

    login(user: User) {
        if (user.username !== '' && user.password !== '') {
            this.backEnd.login(user).subscribe(userToken => {
                this.currentToken = userToken;
                this.loggedIn.next(true);
                this.router.navigate(['/']);
            });
        }
    }

    logout() {
        this.backEnd.logout().subscribe(res => {
            this.currentToken = null;
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
