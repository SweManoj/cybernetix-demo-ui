import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaseManagementService {

  mainURL: string;

  constructor(private http: HttpClient) {
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
    const url = `${this.mainURL}/caseMgmt/entity/getIncidents/${offset}/${size}/2019-03-25%2000%3A00%3A00/2019-08-25%2000%3A00%3A00`;
    return this.http.get(url);
  }

  createIncident(violationData) {
        const url = `${this.mainURL}/incident/createIncident`;
        return this.http.post(url, violationData,{responseType: 'text'});
  }

}
