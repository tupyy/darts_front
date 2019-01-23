import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {GameService} from './services/game.service';

@Injectable({
    providedIn: 'root'
})
export class PlayGuard implements CanActivate {
    constructor(private gameService: GameService,
                private router: Router) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (this.gameService.hasGame()) {
            return true;
        }
        this.router.navigate(['/game/new']);
    }
}

