import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { UserContext } from '../services/userContext';
import { Router, ActivatedRoute } from '@angular/router';
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
    returnUrl: string;

    constructor(private fb: FormBuilder, private loginService: LoginService, private userContext: UserContext,
        private router: Router,
        private activatedRoute: ActivatedRoute, @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {

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
                this.sessionStorage.set('accessToken', res.access_token);
                this.sessionStorage.set('refreshToken', res.refresh_token);

                this.returnUrl = this.activatedRoute.snapshot.paramMap.get('returnUrl');
                this.router.navigateByUrl(this.returnUrl);
            }, error => {
                this.isError = true;
            });
        }
    }
}
