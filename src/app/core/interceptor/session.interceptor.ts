import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.url.includes('oauth')) {

            const accessToken = this.sessionStorage.get('accessToken');
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        }

        return next.handle(request)
            .do(success => {
                console.log('http request success');
            }, error => {
                if (error.status == 410)
                    this.router.navigateByUrl('/login');
            });
    }


}