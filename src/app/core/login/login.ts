import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserContext } from '../services/userContext';
import { SessionStorage } from '../services/sessionStorage';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: 'login.html'
})
export class LoginComponent {
    form: FormGroup;
    username: AbstractControl;
    password: AbstractControl;
    themeName: string;

    constructor(private fb: FormBuilder, private loginService: LoginService, private userContext: UserContext,
        private sessionStorage: SessionStorage, private router: Router) {
        this.themeName = this.userContext.themeName;
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
        });
        this.username = this.form.controls['username'];
        this.password = this.form.controls['password'];
    }
    onSubmit(): void {
        if (this.form.valid) {
            debugger
            this.loginService.login(this.form.value).subscribe((res: any) => {
                if (res.status == 'true') {
                    const authInfo = {
                        authToken: res.authToken
                    };
                    this.userContext.setAuthToken(res.authToken);
                    this.sessionStorage.setItem(null, authInfo);
                    this.loginService.loggedIn.next(true);
                    this.router.navigate(['/dashboard']);
                }
            });
        }
    }
}
