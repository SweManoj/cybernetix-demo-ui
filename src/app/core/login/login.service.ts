import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/finally';
import { environment } from '../../../environments/environment';
import { StorageService, SESSION_STORAGE, isStorageAvailable } from 'angular-webstorage-service';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {
  }

  login(loginData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`, null);
  }

  logout() {
    const requestHeaders = {
      headers: new HttpHeaders({
        accessToken: this.sessionStorage.get('accessToken'),
        refreshToken: this.sessionStorage.get('refreshToken')
      })
    };

    this.http.delete(`${environment.serverUrl}/removeTokens`, requestHeaders).toPromise();

    if (isStorageAvailable) {
      this.sessionStorage.remove('accessToken');
      this.sessionStorage.remove('refreshToken');
      this.sessionStorage.remove('redirectURL');
    }
  }

  refreshAuthToken(): Observable<any> {
    const refreshtoken = this.sessionStorage.get('refreshToken');
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=refresh_token&refresh_token=${refreshtoken}`, null);
  }

  getUsers() {
    const url = `${environment.serverUrl}/v1/user/getUsers`;
    return this.http.get(url);
  }

}
