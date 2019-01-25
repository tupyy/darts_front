import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserToken} from '@app/engine/user';
import {Observable} from 'rxjs';

const BASE_URL = ' http://127.0.0.1:5000/api/v1/';

@Injectable({
    providedIn: 'root'
})
export class BackendService {

    constructor(private http: HttpClient) {
    }

    public login(user: User): Observable<UserToken> {
        return this.http.post<UserToken>(BASE_URL + 'auth/login', user);
    }

    public refreshToken(): Observable<UserToken> {
        return this.http.post<UserToken>(BASE_URL + 'auth/token/refresh', {});
    }

    public logout(): Observable<any> {
        return this.http.post<any>(BASE_URL + 'auth/logout/access', {});
    }

}
