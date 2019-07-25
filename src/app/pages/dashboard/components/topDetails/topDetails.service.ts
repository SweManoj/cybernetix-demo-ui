import { Injectable } from '@angular/core';
import { UserContext } from '../../../../core/services/userContext';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TopDetailsService {

    basePath: string;
    apiPath: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.basePath = this.userContext.getBasePath();
        this.apiPath = this.userContext.getServerUrl();
    }

    getUploadExceedData() {
        const url = `${this.basePath}/api/dashboard/firewallRiskyUsers?records=5`;
        return this.http.get(url);
    }

    getTopThreats() {
        const url = `${this.apiPath}/dashboard/topThreats/0`;
        return this.http.get(url);
    }

    getTopViolations() {
        const url = `${this.apiPath}/dashboard/violations/0?offset=0&size=6`;
        return this.http.get(url);
    }

    getTopRiskyUsers(entityType) {
        const url = `${this.apiPath}/dashboard/violators/0/${entityType}?offset=0&size=5`;
        return this.http.get(url);
    }

    getTopUsers(userType) {
        const url = `${this.apiPath}/dashboard/topusersbygroup/0?grp=${userType}`;
        return this.http.get(url);
    }
}
