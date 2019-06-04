import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoginService {
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    login(loginData) {
        const url = `/api/auth/authLog`;
        return this.http.post(url, loginData);
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
}
