import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginService } from '../login/login.service';
import { map, take } from 'rxjs/operators';
import { UserContext } from './userContext';
import { TokenUtilService } from '../../token-util.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private loginService: LoginService, private router: Router, private userContext: UserContext,
        private tokenUtilService: TokenUtilService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        /* if (this.tokenUtilService.accessToken)
            return new BehaviorSubject<boolean>(true).asObservable();
        else {
            this.router.navigateByUrl('/login');
            return new BehaviorSubject<boolean>(false).asObservable();
        } */

        /* if (sessionStorage.getItem('accessToken') && sessionStorage.getItem('accessToken') != 'null')
            return new BehaviorSubject<boolean>(true).asObservable();
        else {
            this.router.navigateByUrl('/login');
            return new BehaviorSubject<boolean>(false).asObservable();
        } */
        return new BehaviorSubject<boolean>(true).asObservable();

        /* return this.loginService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                const accessToken = localStorage.getItem('accessToken');
                if (!isLoggedIn && !accessToken) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            })
        ); */
    }
}
