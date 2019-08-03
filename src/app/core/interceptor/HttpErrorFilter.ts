import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

// import { AuthenticationService } from './../services/authentication.service';
import { Injectable, Inject } from '@angular/core';
import { LoginService } from '../login/login.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
// import 'rxjs/operator/do';
import  'rxjs/add/operator/do'

@Injectable()
export class HttpErrorFilter implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private loginService: LoginService, private http: HttpClient,
        @Inject(SESSION_STORAGE) private sessionStorage: StorageService, private route: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('.... http error filters...1');

        return next.handle(request)
            .do(
                success => {
                    console.log('success is : ' + success)
                },
                error => {
                    this.handle401Route();
                });

        /* return next.handle(request).pipe(
            catchError((error: any) => {
                if (error.status === 401) {
                    return this.handle401Error(request, next);
                }
                return throwError(error);
            })
        ); */
    }

    handle401Route() {
        this.loginService.refreshAuthToken().subscribe(newToken => {
            this.sessionStorage.set('accessToken', newToken.access_token);
            this.sessionStorage.set('refreshToken', newToken.refresh_token);

            this.route.navigateByUrl('/dashboard');
        })
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        this.loginService.refreshAuthToken().subscribe(newToken => {
            this.sessionStorage.set('accessToken', newToken.access_token);
            this.sessionStorage.set('refreshToken', newToken.refresh_token);

            // return next.handle(request);
        })


        if (request.url.includes('refresh')) {
            this.isRefreshingToken = false;
            return of(<any>this.loginService.logout());
        }


    }
}


/*
if (!this.isRefreshingToken) {
    this.isRefreshingToken = true;
    this.tokenSubject.next(null);

    return this.loginService.refreshAuthToken().pipe(switchMap(token => {
        if (token) {
            debugger
            console.log('token value is : ' + token)
            this.sessionStorage.set('accessToken', token.access_token);
            this.sessionStorage.set('refreshToken', token.refresh_token);
            this.tokenSubject.next(token.value);
            return next.handle(request);
        }
        return of(<any>this.loginService.logout());
    }),
        catchError(err => {
            this.loginService.logout();
            return throwError(err.error);
        }),
        finalize(() => {
            this.isRefreshingToken = false;
        }));
} else {
    this.isRefreshingToken = false;

    return this.tokenSubject
        .pipe(filter(token => token != null),
            take(1),
            switchMap(token => {
                return next.handle(request);
            }));
} */


/* intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       return next.handle(request).pipe(
           catchError((error: any) => {
               if (error.status === 401 && !request.url.includes('oauth')) {
                   return this.handle401Error(request, next);
               }
               return throwError(error);
           })
       );
   } */



/* async handleError() {
    const refreshToken = this.sessionStorage.get('refreshToken');
    return await this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } })
        .toPromise();
} */
