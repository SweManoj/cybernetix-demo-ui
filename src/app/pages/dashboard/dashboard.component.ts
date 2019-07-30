import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../core/login/login.service';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { TokenUtilService } from '../../token-util.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent /* implements OnInit  */ {

    constructor(private tokenUtilService: TokenUtilService, private loginService: LoginService,
        private http: HttpClient) {

        /* setInterval(() => {
            if (new Date(sessionStorage.getItem('expiryDate')) < new Date()) {
                this.tokenUtilService.getNewAccessToken();
            }
        }, 5000); */
    }

    /* async check() {
        console.log('function first acess token : ' + this.tokenUtilService.accessToken);
        const t = await this.tokenUtilService.getRefreshToken();
        console.log('function second acess token : ' + this.tokenUtilService.accessToken);
    }

    async ngOnInit() {
        console.log('Date expire..... : ' + this.tokenUtilService.checkTokenAvailability())

        if (this.tokenUtilService.checkTokenAvailability()) {
            console.log('first access in : ' + this.tokenUtilService.accessToken)
            const d = await this.tokenUtilService.getRefreshToken();
            console.log('second acess token : ' + this.tokenUtilService.accessToken);
            console.log('second line...................');
        }
    } */

}


/* if (this.tokenUtilService.checkTokenAvailability()) {
    console.log('manoj first.........' + this.tokenUtilService.accessToken);
    const manoj = await this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${this.tokenUtilService.refreshToken}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } })
        .pipe(map(response => {
            this.tokenUtilService.accessToken = response.access_token
            this.tokenUtilService.refreshToken = response.access_token
            let expiryDate = new Date();
            expiryDate.setSeconds(expiryDate.getSeconds() + (response.expires_in - 15));
            this.tokenUtilService.expiryDate = expiryDate;
            return response;
        })).toPromise();
    location.reload();
    console.log('manoj second.........' + this.tokenUtilService.accessToken);
    this.check();
    console.log('............function finished........');
    console.log('first line...................');
    console.log('first acess token : ' + this.tokenUtilService.accessToken);

    console.log('old access in : ' + this.tokenUtilService.accessToken);
    forkJoin(this.tokenUtilService.getRefreshToken());

    // const manoj = await this.tokenUtilService.getRefreshToken();
    console.log('new access in : ' + this.tokenUtilService.accessToken); */
