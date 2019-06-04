import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../core/services/userContext';

@Injectable({
  providedIn: 'root'
})
export class CaseManagementService {

  private theme: string;
  basepath: string;
  constructor(private http: HttpClient, private userContext: UserContext) {
      this.basepath = this.userContext.getBasePath();
      this.theme = this.userContext.getTheme();
  }

  getAllCases(){
    debugger
    const url = `${this.basepath}/api/dashboard/getAllCases`;
    return this.http.get(url);
  }
}
