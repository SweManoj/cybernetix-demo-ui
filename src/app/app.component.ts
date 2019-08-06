import { Component, HostBinding, HostListener, OnInit, Inject } from '@angular/core';
import { UserContext } from './core/services/userContext';
import { LoginService } from './core/login/login.service';

@Component({
    selector: 'body',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    @HostBinding('class') public theme: string;
    constructor(private userContext: UserContext, private _loginService: LoginService) {
        this.theme = this.userContext.getTheme();
    }

}
