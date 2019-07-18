import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import { config } from '../../../config';
// import { Tokens } from '../../auth/models/token';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private http: HttpClient) {
  }

  login(loginData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/cybernetix/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`, null, { headers: { "Authorization": "Basic Y3liZXJuZXRpeC1jbGllbnQ6c2VjcmV0" } });
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  refreshAuthToken(refreshtoken): Observable<any> {
    return this.http.post(`${environment.serverUrl}/cybernetix/oauth/token?grant_type=refresh_token&refresh_token=${refreshtoken}`, null, { headers: { "Authorization": "Basic Y3liZXJuZXRpeC1jbGllbnQ6c2VjcmV0" } });
  }

}