import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PolicyViolationSummaryService {

    private theme: string;
    basepath: string;
    apiPath: string;

    constructor(private http: HttpClient) {
        this.apiPath = 'http://3.130.138.106:9090/pvCasemgmt';
    }

    updatePolicy(policyData, violationId) {
        const url = `${this.apiPath}/updatepolicyViolation/${violationId}`;
        return this.http.post(url, policyData, {});
    }




}
