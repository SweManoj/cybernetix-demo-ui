import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class RiskyUserService {

    mainURL: string;

    constructor(private http: HttpClient) {
        this.mainURL = `${environment.serverUrl}/v1`;
    }

    getRiskyEntityDetails(entityId, entityType) {
        const url = `${this.mainURL}/entity/${entityType}?entityId=${entityId}`;
        return this.http.get(url);
    }

    getRiskyUserCountDetails(entityId) {
        const url = `${this.mainURL}/entity/counts/${entityId}`;
        return this.http.get(url);
    }

    getPolicyViolationsForEntity(entityId, startDate, endDate) {
        const url = `${this.mainURL}/entity/policiesViolation/${entityId}/${startDate}/${endDate}`;
        return this.http.get(url);
    }

    getViolationSummary(ruleId, userId, isotimestamp) {
        const url = `${this.mainURL}/api/dashboard/getViolationSummary?ruleId=${ruleId}&userId=${userId}&timeStamp=${isotimestamp}`;
        return this.http.get(url);
    }

    getPolicyViolationForGivenPeriod(entityId, startDate, endDate, offset) {
        const url = `${this.mainURL}/entity/policiesViolationsummaryDetails/${entityId}/${startDate}/${endDate}?offset=${offset}`;
        return this.http.get(url);
    }

    getDayBasisRiskScore(entityId) {
        const url = `${this.mainURL}/entity/linegraph?entityId=${entityId}`;
        return this.http.get(url);
    }

    fetchEnrichIndexKibanaURL(entityId,violationEventDate,violationEventTime,ruleId) {
        const url = `${this.mainURL}/entity/fetchEnrichIndexKibanaURL/${entityId}/${violationEventDate}/${violationEventTime}/${ruleId}`;
        return this.http.get(url);
    }
}
