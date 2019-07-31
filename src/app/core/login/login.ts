import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserContext } from '../services/userContext';
import { SessionStorage } from '../services/sessionStorage';
import { Router } from '@angular/router';
import { TokenUtilService } from '../../token-util.service';
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    form: FormGroup;
    username: AbstractControl;
    password: AbstractControl;
    themeName: string;
    isError: boolean = false;

    constructor(private fb: FormBuilder, private loginService: LoginService, private userContext: UserContext,
          private router: Router,
        private tokenUtilService: TokenUtilService,@Inject(SESSION_STORAGE) private sessionStorage: StorageService) {

        this.themeName = this.userContext.themeName;
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }

    loginSubmit(): void {
        if (this.form.valid) {
            this.loginService.login(this.form.value).subscribe(res => {
                this.sessionStorage.set('accessToken',res.access_token);
                /* if (res) {
                    localStorage.setItem('accessToken', res.access_token);
                    sessionStorage.setItem('accessToken', res.access_token);
                    sessionStorage.setItem('refreshToken', res.refresh_token);
                    this.tokenUtilService.accessToken = res.access_token
                    this.tokenUtilService.refreshToken = res.refresh_token
                    let expiryDate = new Date();
                    expiryDate.setSeconds(expiryDate.getSeconds() + (res.expires_in - 15));
                    this.tokenUtilService.expiryDate = expiryDate;
                    sessionStorage.setItem('expiryDate', expiryDate + '');

                    this.loginService.loggedIn.next(true);
                    this.router.navigate(['/dashboard']);
                } else
                    this.isError = true; */
                    this.router.navigateByUrl('/dashboard');
            }, error => {
                this.isError = true;
            })
        }
    }
}
