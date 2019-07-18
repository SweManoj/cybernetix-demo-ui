import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../../../core/services/userContext';

@Injectable({
    providedIn: 'root'
})
export class PolicyViolationSummaryService {

    private theme: string;
    apiPath: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.apiPath = this.userContext.getServerUrl();
    }

    getPolicyDetails(violationId) {
        const url = `${this.apiPath}/pvCasemgmt/findOrAddPolicyViolationSummary/${violationId}`;
        return this.http.post(url, {}, {});
    }

    updatePolicy(policyData, violationId) {
        const url = `${this.apiPath}/pvCasemgmt/updatepolicyViolation/${violationId}`;
        return this.http.post(url, policyData, {});
    }

    assignPolicyToUser(violationId){
        const url = `${this.apiPath}/pvCasemgmt/assigntoMePolicy/${violationId}`;
        return this.http.patch(url, {}, {});
    }




}
