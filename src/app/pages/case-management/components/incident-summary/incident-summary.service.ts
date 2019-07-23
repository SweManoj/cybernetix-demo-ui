import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../../../core/services/userContext';

@Injectable({
    providedIn: 'root'
})
export class IncidentSummaryService {

    private theme: string;
    apiPath: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.apiPath = this.userContext.getServerUrl();
    }

    getIncidentDetials(violationId) {
        const url = `${this.apiPath}/incident/getIncidentSummary/${violationId}`;
        return this.http.get(url, {});
    }

    updatePolicy(policyData, violationId) {
        const url = `${this.apiPath}/pvCasemgmt/updatepolicyViolation/${violationId}`;
        return this.http.patch(url, policyData, {});
    }

    assignIncidentToUser(incidentId) {
        const url = `${this.apiPath}/incident/assigntoMeIncident/${incidentId}`;
        return this.http.patch(url, {}, {responseType: 'text'});
    }

    uploadIncidentSummaryAttachment(fileData, attachedFileDetails) {
            const url = `${this.apiPath}/uploadIncidentSummaryAttachment`;
            const formData: FormData = new FormData();
            formData.append('attachFile', fileData);
            formData.append('attachFileDetails', attachedFileDetails);
            return this.http.post(url, formData, {});
    }


    addComment(comment) {
        const url = `${this.apiPath}/pvCasemgmt/save/policycomments`;
        return this.http.post(url, comment, {});
    }

    deleteComment(commentId) {
        const url = `${this.apiPath}/pvCasemgmt/deletePolicyComment/${commentId}`;
        return this.http.delete(url, {});
    }


}
