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
    isError: boolean = false;

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
            this.loginService.login(this.form.value).subscribe((res: boolean) => {
                if (res == true) {
                    this.sessionStorage.setItem('authorized', true);
                    this.router.navigate(['/dashboard']);
                }
                else {
                    this.sessionStorage.setItem('authorized', true);
                    this.isError = true;
                }
            });
        }
    }
}
