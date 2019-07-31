import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../core/services/userContext';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseManagementService {

  mainURL: string;

  constructor(private http: HttpClient, private userContext: UserContext) {
    this.mainURL = `${environment.serverUrl}/v1`;
  }

  getAllCases() {
    const url = `${this.mainURL}/api/dashboard/getAllCases`;
    return this.http.get(url);
  }

  getAllPolicyViolations(startDateTime, endDateTime, offset, size) {
    const url = `${this.mainURL}/caseMgmt/entity/${startDateTime}/${endDateTime}/?offset=${offset}&size=${size}`;
    return this.http.get(url);
  }

  getAllIncidents(offset, size) {
    const url = `${this.mainURL}/caseMgmt/entity/getIncidents/${offset}/${size}`;
    return this.http.get(url);
  }

}
