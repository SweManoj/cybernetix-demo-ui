import { Component, HostBinding, HostListener, OnInit, Inject } from '@angular/core';
import { UserContext } from './core/services/userContext';
import { LoginService } from './core/login/login.service';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class') public theme: string;
    constructor(private userContext: UserContext, private _loginService: LoginService, @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {
        this.theme = this.userContext.getTheme();
    }

    ngOnInit(): void {
        setInterval(() => {
            this._loginService.refreshAuthToken().subscribe((tokenObj) => {
                this.sessionStorage.set('accessToken', tokenObj['access_token'])
            })
        }, 10000)
    }

}
