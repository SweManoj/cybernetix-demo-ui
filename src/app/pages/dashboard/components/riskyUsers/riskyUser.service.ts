import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserContext } from '../../../../core/services/userContext';

@Injectable()
export class RiskyUserService {
    basepath: string;
    constructor(private http: HttpClient, private userContext: UserContext) {
        this.basepath = this.userContext.getBasePath();
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
        const url = `${this.basepath}/api/dashboard/firewallRiskyUsers?records=20&page=${limit}`;
        return this.http.get(url);
    }

    getRiskyUserDetails(entityId) {
        const url = `http://3.130.138.106:9090/v1/entity/${entityId}`;
        return this.http.get(url);
    }

    getRiskyUserCountDetails(entityId) {
        const url = `http://3.130.138.106:9090/v1/entity/counts/${entityId}`;
        return this.http.get(url);
    }

    getSelectedUserData(sourceId, isResource) {
        const url = `${this.basepath}/api/dashboard/get_Userdata_by_Source?source=${sourceId}&resource=${isResource}`;
        return this.http.get(url);
    }
    getSelectedUserDataFromModel(sourceId, isResource) {
        const url = `${this.basepath}/api/dashboard/get_Userdata_by_SourceModel?source=${sourceId}&resource=${isResource}`;
        return this.http.get(url);
    }

    getViolationSummary(ruleId, userId,isotimestamp) {
        const url = `${this.basepath}/api/dashboard/getViolationSummary?ruleId=${ruleId}&userId=${userId}&timeStamp=${isotimestamp}`;
        return this.http.get(url);
    }
}
