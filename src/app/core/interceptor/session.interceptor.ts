import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import 'rxjs/add/operator/do';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const accessToken = localStorage.getItem('accessToken');

        if (accessToken != 'null' || accessToken == undefined) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(request)
            .do(
                success => {
                    console.log('success is : ' + success)
                },
                error => {
                    console.log('error is : ' + error);
                }
            );
    }

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