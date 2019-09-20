import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { SESSION_STORAGE, StorageService, isStorageAvailable } from 'angular-webstorage-service';
import { LoginService } from '../login/login.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        @Inject(SESSION_STORAGE) private sessionStorage: StorageService, private loginService : LoginService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url.includes('oauth') || request.url.includes('getsecretekey')) {
            const basicAuthToken = `Basic ${btoa('cybernetix-client:secret')}`; // base 64 encode mechanism
            request = request.clone({
                setHeaders: {
                    'Authorization': basicAuthToken
                }
            });
        } else {
            const accessToken = this.sessionStorage.get('accessToken');
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(request)
            .do(success => {
                this.loginService.setSecurityTokenInput(false);
                return success;
            }, error => {

            if (error.error.error_description == '2F Authentication token required') {
                this.loginService.setSecurityTokenInput(true);
            }

                if (error.status == 401) {
                    if (isStorageAvailable) {
                        this.sessionStorage.remove('accessToken');
                        this.sessionStorage.remove('refreshToken');
                    }
                    if (!this.sessionStorage.get('redirectURL'))
                        this.sessionStorage.set('redirectURL', this.router.url);
                    this.router.navigateByUrl('/login');
                }
                else
                    return throwError(error);
            });
    }

}
