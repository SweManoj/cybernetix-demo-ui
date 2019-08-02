import { Injectable, Inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,
        @Inject(SESSION_STORAGE) private sessionStorage: StorageService) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        if (this.sessionStorage.get('accessToken'))
            return of(true);
        else {
            this.router.navigate(['/login', { returnUrl: state.url }]);  // optional url values
            return of(false);
        }
    }
}
