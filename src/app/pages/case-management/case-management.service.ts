import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../core/services/userContext';

@Injectable({
  providedIn: 'root'
})
export class CaseManagementService {

  private theme: string;
  basepath: string;
  apiPath: string;

  constructor(private http: HttpClient, private userContext: UserContext) {
      this.basepath = this.userContext.getBasePath();
      this.apiPath = 'http://3.130.138.106:9090/caseMgmt';
      this.theme = this.userContext.getTheme();
  }

  getAllCases(){
    //debugger
    const url = `${this.basepath}/api/dashboard/getAllCases`;
    return this.http.get(url);
  }

    getAllPolicyViolations(startDateTime, endDateTime, offset, size) {
        const url = `${this.apiPath}/entity/${startDateTime}/${endDateTime}/?offset=${offset}&size=${size}`;
        return this.http.get(url);
    }


    getAllIncidents(offset, size) {
        const url = `${this.apiPath}/entity/getIncidents/${offset}/${size}`;
        return this.http.get(url);
    }


}
