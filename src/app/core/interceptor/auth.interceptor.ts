/* import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpClient, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContext } from '../services/userContext';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { tap, catchError, finalize, filter, take, switchMap } from 'rxjs/operators';
import { debug } from 'util';
import { LoginService } from '../login/login.service';
import { TokenUtilService } from '../services/token-util.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(private userContext: UserContext, private http: HttpClient, private authService: LoginService,
        private tokenUtil: TokenUtilService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
        return next.handle(this.addTokenToRequest(request, this.tokenUtil.accessToken))
            .pipe(
                catchError(err => {
                    if (err instanceof HttpErrorResponse) {
                        switch ((<HttpErrorResponse>err).status) {
                            case 401:
                                return this.handle401Error(request, next);
                            case 400:
                                return <any>this.authService.logout();
                        }
                    } else {
                        return throwError(err);
                    }
                }));
    }

    private addTokenToRequest(request: HttpRequest<any>, accessToken: string): HttpRequest<any> {
        return request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } });
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next(null);

            return this.tokenUtil.askNewAccessToken()
                .pipe(
                    switchMap((user: any) => {
                        if (user) {
                            this.tokenSubject.next(user.access_token);;
                            // localStorage.setItem('currentUser', JSON.stringify(user));
                            return next.handle(this.addTokenToRequest(request, user.access_token));
                        }

                        return <any>this.authService.logout();
                    }),
                    catchError(err => {
                        return <any>this.authService.logout();
                    }),
                    finalize(() => {
                        this.isRefreshingToken = false;
                    })
                );
        } else {
            this.isRefreshingToken = false;

            return this.tokenSubject
                .pipe(filter(token => token != null),
                    take(1),
                    switchMap(token => {
                        return next.handle(this.addTokenToRequest(request, token));
                    }));
        }
    }
}
 */