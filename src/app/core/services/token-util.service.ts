/* import { Injectable } from '@angular/core';
import { LoginService } from '../login/login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class TokenUtilService {

    accessToken: string;
    refreshToken: string;
    expiryDate: Date;

    constructor(private loginService: LoginService, private http: HttpClient) {
    }

    checkTokenAvailability() {
        return this.expiryDate < new Date();
    }

    async getNewAccessToken() {
        return await this.loginService.refreshToken(this.refreshToken).then(response => {

            this.accessToken = response.access_token
            this.refreshToken = response.access_token
            let expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + (response.expires_in - 45));
            this.expiryDate = expiryDate;
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
 */