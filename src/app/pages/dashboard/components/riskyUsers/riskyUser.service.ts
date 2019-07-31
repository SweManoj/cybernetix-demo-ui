import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../../../core/services/userContext';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class RiskyUserService {

    mainURL: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.mainURL = userContext.getServerUrl();
    }

    getData() {
        return [
            {
                name: 'Danae Farone',
                department: 'Engineering',
                riskScore: 590.7,
                icon: 'user'
            }, {
                name: 'Major Fisch',
                department: 'Marketing',
                riskScore: 487,
                icon: 'user'
            }, {
                name: 'Casandra Baur',
                department: 'Sales',
                riskScore: 312.8,
                icon: 'user'
            }, {
                name: '10.0.1.1',
                department: '',
                riskScore: 200.5,
                icon: 'globe'
            }, {
                name: 'Jim Duster',
                department: 'Marketing',
                riskScore: 200.5,
                icon: 'user'
            }
        ];
    }

    getUploadExceedData(limit) {
        const url = `${this.mainURL}/api/dashboard/firewallRiskyUsers?records=20&page=${limit}`;
        return this.http.get(url);
    }

    getRiskyUserDetails(entityId, entityType) {
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

    getSelectedUserData(sourceId, isResource) {
        const url = `${this.mainURL}/api/dashboard/get_Userdata_by_Source?source=${sourceId}&resource=${isResource}`;
        return this.http.get(url);
    }
    getSelectedUserDataFromModel(sourceId, isResource) {
        const url = `${this.mainURL}/api/dashboard/get_Userdata_by_SourceModel?source=${sourceId}&resource=${isResource}`;
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
}
