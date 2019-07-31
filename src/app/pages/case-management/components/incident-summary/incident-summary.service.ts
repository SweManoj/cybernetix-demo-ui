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
        return this.http.get(url);
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
            return this.http.post(url, formData);
    }

    downloadIncidentSummaryAttachment(attachementId) {
        const url = `${this.apiPath}/downloadIncidentUploadedFileByAttachId/${attachementId}`;
        return this.http.get(url, {responseType: 'blob'});
    }

    updateIncident(incidentData, incId) {
        const url = `${this.apiPath}/incident/updateIncident/${incId}`;
        return this.http.patch(url, incidentData, {responseType: 'text'});
    }

    saveIncidentActivity(activity) {
        const url = `${this.apiPath}/incident/save/incidentactivity`;
        return this.http.post(url, activity);
    }

    setIncidentOutcome(outcomeData) {
        const url = `${this.apiPath}/incident/setoutcome`;
        return this.http.patch(url, outcomeData);
    }

    addComment(comment) {
        const url = `${this.apiPath}/incident/save/incidentcomment`;
        return this.http.post(url, comment);
    }

    deleteComment(commentId) {
        const url = `${this.apiPath}/incident/deletePolicyComment/${commentId}`;
        return this.http.delete(url,{responseType: 'text'});
    }

}
