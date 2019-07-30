import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { LoginService } from './core/login/login.service';
import { environment } from '../environments/environment';

@Injectable()
export class TokenUtilService {

    accessToken: string;
    refreshToken: string;
    expiryDate: Date;

    constructor(private loginService: LoginService, private http: HttpClient) {
    }

    checkTokenAvailability() {
        return this.expiryDate > new Date();  // if expriy date is big than current time - true
    }

    getNewAccessToken() {
        return this.loginService.refreshToken(this.refreshToken).then(response => {

            sessionStorage.setItem('accessToken', response.access_token);
            sessionStorage.setItem('refreshToken', response.refresh_token);

            console.log('access token storage : '+ sessionStorage.getItem('accessToken'))
            this.accessToken = response.access_token
            this.refreshToken = response.refresh_token
            let expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + (response.expires_in - 45));
            this.expiryDate = expiryDate;

            sessionStorage.setItem('expiryDate', expiryDate + '');
            return response;
        });
    }

    askNewAccessToken() {
        return this.loginService.askNewAccessToken(this.refreshToken);
    }

    async getRefreshToken(): Promise<any> {

        return await this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${this.refreshToken}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } })
            .pipe(map(response => {
                this.accessToken = response.access_token
                this.refreshToken = response.refresh_token
                let expiryDate = new Date();
                expiryDate.setSeconds(expiryDate.getSeconds() + (response.expires_in - 15));
                this.expiryDate = expiryDate;
                return response;
            })).toPromise();
    }

}
