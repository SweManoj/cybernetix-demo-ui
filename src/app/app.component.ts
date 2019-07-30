import { Component, HostBinding } from '@angular/core';
import { UserContext } from './core/services/userContext';
import { TokenUtilService } from './token-util.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    @HostBinding('class') public theme: string;
    constructor(private userContext: UserContext, private tokenUtilService: TokenUtilService) {
        this.theme = this.userContext.getTheme();
        setInterval(() => {
            if (sessionStorage.getItem('accessToken')) {
                console.log('validate : ' + (new Date(sessionStorage.getItem('expiryDate')) < new Date()));
                console.log('expiry : ' + (new Date(sessionStorage.getItem('expiryDate')) + '.... current ....' + new Date()));
                if (new Date(sessionStorage.getItem('expiryDate')) < new Date()) {
                    this.tokenUtilService.getNewAccessToken();
                }
            }
        }, 6000);
    }
}
