import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {
    loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    login(loginData) : Observable<any> {
        return this.http.post(`http://localhost:9090/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`,null,{headers:{"Authorization": "Basic Y3liZXJuZXRpeC1jbGllbnQ6c2VjcmV0"}});
    }

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
}
