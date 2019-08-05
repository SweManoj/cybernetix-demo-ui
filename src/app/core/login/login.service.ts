import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { StorageService, SESSION_STORAGE, isStorageAvailable } from 'angular-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router
    , @Inject(SESSION_STORAGE) private sessionStorage: StorageService) {
  }

  login(loginData): Observable<any> {
    return this.http.post(`${environment.serverUrl}/oauth/token?grant_type=password&username=${loginData.username}&password=${loginData.password}`, null);
  }

  logout() {
    if (isStorageAvailable) {
      this.sessionStorage.remove('accessToken');
      this.sessionStorage.remove('refreshToken');
    }
    this.router.navigate(['/login']);
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
