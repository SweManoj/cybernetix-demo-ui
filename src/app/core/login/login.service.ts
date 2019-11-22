import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';

@Injectable()
export class LoginService {
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    login(loginData) {
        const username = 'DemoSvcAccCnetx';
        const password = 'CNetix20875sai@$';
        return of(loginData.username == username && loginData.password == password);
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

}
