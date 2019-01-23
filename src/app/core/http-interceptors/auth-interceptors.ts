import {Injectable} from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import {AuthService} from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const re = /login/gi;

        if (req.url.search(re) === -1) {
            const authReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getAuthorizationToken()}`
                }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }
}
