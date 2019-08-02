import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private basicAuthToken = `Basic ${btoa('cybernetix-client:secret')}`; // base 64 encode mechanism

  constructor(private http: HttpClient, private router: Router
    , @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {
  }

  login(loginData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`, null, { headers: { "Authorization": this.basicAuthToken } });
  }

  logout() {
    this.sessionStorage.remove('accessToken');
    this.sessionStorage.remove('refreshToken');
    this.router.navigate(['/login']);
  }

  askNewAccessToken(refreshToken: string): Observable<any> {
    return this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, { headers: { "Authorization": this.basicAuthToken } })
  }

  refreshToken(refreshToken: string): Promise<any> {

    return this.http.post<any>(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshToken}`, null, { headers: { "Authorization": this.basicAuthToken } })
      .pipe(map(res => {
        return res;
      })).toPromise();
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
