import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class HttpFilter implements HttpInterceptor {

    constructor(@Inject(SESSION_STORAGE) private sessionStorage: StorageService){
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(this.addAuthentication(request));
    }

    private addAuthentication(request: HttpRequest<any>): HttpRequest<any> {

        console.log('.... http filters...2');
        if (!request.url.includes('/oauth/')) {
            const accessToken = this.sessionStorage.get('accessToken');
            if (accessToken) {
                request = request.clone({
                    setHeaders: { Authorization: 'Bearer ' + accessToken }
                });
            }
        }
        return request;

    }

}