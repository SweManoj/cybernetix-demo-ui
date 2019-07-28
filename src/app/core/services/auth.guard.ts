import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { map, take } from 'rxjs/operators';
import { UserContext } from './userContext';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userContext: UserContext) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.loginService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                const accessToken = localStorage.getItem('accessToken');
                if (!isLoggedIn && !accessToken) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        );
    }
}
