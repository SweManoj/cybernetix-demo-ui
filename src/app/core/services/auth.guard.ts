import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LoginService } from '../login/login.service';
import { map, take } from 'rxjs/operators';
import { UserContext } from './userContext';
import { SessionStorage } from './sessionStorage';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userContext: UserContext,
        private sessionStroage: SessionStorage) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        if (this.sessionStroage.getItem('authorized'))
            return of(true);
        else
            this.router.navigate(['/login']);
    }
}
