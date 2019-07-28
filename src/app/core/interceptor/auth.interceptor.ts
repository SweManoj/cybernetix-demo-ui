/* import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContext } from '../services/userContext';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError, finalize, filter, take, switchMap } from 'rxjs/operators';
import { debug } from 'util';
import { LoginService } from '../login/login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    accessToken = localStorage.getItem('accessToken');
    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private userContext: UserContext, private http: HttpClient, private authService: LoginService) {
    } 

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        debugger

        let token = localStorage.getItem('accessToken');

        if (token != 'null') {
            debugger
            request = request.clone({
                setHeaders: {
                    'Authorization': 'Bearer ' + token
                }
            });
        }

        return next.handle(request).pipe(catchError(error => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
                this.isRefreshing = true;
                return this.handle401Error(request, next);
            } else {
                return throwError(error);
            }
        }));
    }

    private addToken(request: HttpRequest<any>, token: string) {
        if (token != "null") {
            return request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } else
            return request;
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
                this.isRefreshing = false;
                this.refreshTokenSubject.next(token.jwt);
                return next.handle(this.addToken(request, token.jwt));
            }));
        
    }
} */

/* if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        } */