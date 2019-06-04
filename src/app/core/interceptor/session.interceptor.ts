import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {
    constructor(private route: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
        }, (error: any) => {
            if (error instanceof HttpErrorResponse) {
                if (error.status === 401) {
                    this.route.navigate(['/login']);
                }
            }
        }));
    }

}
