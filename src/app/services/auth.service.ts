import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {User} from './user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private currentUser: User;

    get isAuthenticated() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router
    ) {
    }

    login(user: User) {
        if (user.username !== '' && user.password !== '') {
            this.currentUser = user;
            this.loggedIn.next(true);
            this.router.navigate(['/']);
        }
    }

    logout() {
        this.currentUser = null;
        this.loggedIn.next(false);
    }

    public getCurrentUser() {
        return this.currentUser;
    }
}
