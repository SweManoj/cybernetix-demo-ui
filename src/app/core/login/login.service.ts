import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { RequestOptions, Headers, } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private basicAuthToken = `Basic ${btoa('cybernetix-client:secret')}`; // base 64 encode mechanism

  constructor(private http: HttpClient, private router: Router) {
  }

  login(loginData): Observable<any> {
    localStorage.setItem('accessToken', null);
    console.log('basic is : ' + this.basicAuthToken);
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    console.log('..... refresh toke .... : ' + refreshToken);

    const accessToken = localStorage.getItem('accessToken');
    console.log('..... access toke .... : ' + accessToken);

    localStorage.setItem('accessToken', null);

    return this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, { headers: { "Authorization": `Basic ${btoa('cybernetix-client:secret')}` } })
      .pipe(
        map(response => {
          debugger
          localStorage.setItem('accessToken', response.access_token);
          localStorage.setItem('refreshToken', response.refresh_token);
          this.router.navigateByUrl('/dashboard');
          return response;
        }));
  }

  getAuthToken(): string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser != null) {
      return currentUser.accessToken;
    }

    return '';
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  refreshAuthToken(): Observable<any> {
    const refreshtoken = localStorage.getItem('refreshToken');
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshtoken}`, null, { headers: { "Authorization": "Basic Y3liZXJuZXRpeC1jbGllbnQ6c2VjcmV0" } });
  }

  getUsers() {
    const url = `${environment.serverUrl}/v1/user/getUsers`;
    return this.http.get(url);
  }

}
