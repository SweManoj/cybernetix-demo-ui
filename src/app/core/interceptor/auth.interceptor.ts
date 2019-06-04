import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContext } from '../services/userContext';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private userContext: UserContext) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let modifiedUrl: string;
        const url = req.url;
        const method: string = req.method;
        const requestHeaders: any = {};
        const authToken = this.userContext.getAuthToken();

        // Adding the cache buster
        /*if (req.method && req.method.toLowerCase() === 'get') {
            if (url) {
                const pos = url.indexOf('?');
                if (pos === -1) {
                    modifiedUrl = `${modifiedUrl}?_cb= + ${new Date().getTime()}`;
                } else {
                    modifiedUrl = `${modifiedUrl }+ &_cb= + ${new Date().getTime()}`;
                }
            }
        }*/
        if (authToken) {
            requestHeaders.token = authToken;
        }
        modifiedUrl = url;
        const reqClone = req.clone({ method, setHeaders: requestHeaders, url: modifiedUrl });
        return next.handle(reqClone);
    }
}
