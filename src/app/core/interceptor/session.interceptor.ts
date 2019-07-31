import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';
import { Route, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { TokenUtilService } from '../../token-util.service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

    constructor(private tokenUtilService: TokenUtilService, private router: Router) {
    }

    async handleError(error) {
        if (error.status == 401) {
            return await this.tokenUtilService.getNewAccessToken()
        }
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        /* if (!request.url.includes('oauth')) {
            const accessToken = sessionStorage.getItem('accessToken');
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } */

        // next.handle(request)
        /* .pipe(
            catchError(err => {
                if (err.status == 401) {
                    this.handleError(err);
                    if (!request.url.includes('oauth')) {
                        const accessToken = this.tokenUtilService.accessToken;
                        request = request.clone({
                            setHeaders: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                    }
                    return next.handle(request);
                }

                return err;
            })
        ); */

        return next.handle(request);
           /*  .do(success => console.log('success'),
                error => {
                    if (error.status == 401) {
                        sessionStorage.removeItem('accessToken');
                        sessionStorage.removeItem('refreshToken');
                        sessionStorage.removeItem('expiryDate');
                        sessionStorage.clear();
                        this.router.navigateByUrl('/login')
                    }
                }); */
    }

    /* .do(success => console.log(success),
        async error => {
            debugger
            console.log('1......' + this.tokenUtilService.expiryDate)
            if (error.status == 401 && this.tokenUtilService.expiryDate < new Date()) {
                console.log('2......' + this.tokenUtilService.expiryDate)
                console.log('.....' + (this.tokenUtilService.expiryDate < new Date()));
                const d = await this.tokenUtilService.getRefreshToken();
                console.log(error);
                // return next.handle(request);
            } else
                return next.handle(request);
            // this.router.navigateByUrl('/dashboard');
        }) */

}

/* return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
            console.log(event.type);
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.route.navigate(['/login']);
                }
            }
        })); */

/* .do(
    success => {
        console.log('Success request : ' + success)
    },
    error => {
        if (error.status == 401) {
            console.log('Invalid Authentication Error');
            this.loginService.refreshAuthToken().subscribe();
            return throwError(new HttpErrorResponse({ status: 401 }));
        }
    }
); */

/* return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
       }, (error: any) => {
           if (error instanceof HttpErrorResponse) {
               if (error.status === 401) {
                   this.route.navigate(['/login']);
               }
           }
       })); */