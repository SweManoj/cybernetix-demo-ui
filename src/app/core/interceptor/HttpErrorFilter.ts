/* import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient } from '@angular/common/http';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';

// import { AuthenticationService } from './../services/authentication.service';
import { Injectable, Inject } from '@angular/core';
import { LoginService } from '../login/login.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorFilter implements HttpInterceptor {

    isRefreshingToken = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private authenticationService: LoginService, private http: HttpClient,
        @Inject(SESSION_STORAGE) private sessionStorage: StorageService,private route:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('.... http error filters...1');
        return next.handle(request).pipe(
            catchError((error: any) => {
                if (error.status === 401) {
                    // return this.handle401Error(request, next);
                    const newToken = this.handleError();
                    newToken.then(res => {
                        this.sessionStorage.set('accessToken', res.access_token);
                        this.sessionStorage.set('refreshToken', res.refresh_token);
                        location.replace(this.route.url);
                        
                    });
                    return newToken;
                }
                return throwError(error);
            })
        );
    }

    async handleError() {
        const refreshToken = this.sessionStorage.get('refreshToken');
        return await this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } })
            .toPromise();
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (request.url.includes('refresh_token')) {
            this.isRefreshingToken = false;
            return of(<any>this.authenticationService.logout());
        }

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            this.tokenSubject.next(null);

            return this.authenticationService.refresh().pipe(switchMap(token => {
                if (token) {
                    this.sessionStorage.set('accessToken', token.access_token);
                    this.sessionStorage.set('refreshToken', token.refresh_token);
                    this.tokenSubject.next(token.value);
                    return next.handle(request);
                }
                return of(<any>this.authenticationService.logout());
            }),
                catchError(err => {
                    this.authenticationService.logout();
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
        }
    }
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