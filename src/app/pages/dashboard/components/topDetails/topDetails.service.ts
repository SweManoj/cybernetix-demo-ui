import { Injectable } from '@angular/core';
import { UserContext } from '../../../../core/services/userContext';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TopDetailsService {

    basePath: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.basePath = "http://3.130.138.106:9090/v1";
    }

    getUploadExceedData() {
        const url = `${this.basePath}/api/dashboard/firewallRiskyUsers?records=5`;
        return this.http.get(url);
    }

    getTopThreats() {
        const url = `${this.basePath}/dashboard/topThreats/0`;
        return this.http.get(url);
    }  


    getTopViolations() {
        const url = `${this.basePath}/dashboard/violations/0?offset=0&size=6`;
        return this.http.get(url);
    }

    getTopRiskyUsers(entityType) {
        const url = `${this.basePath}/dashboard/violators/0/${entityType}?offset=0&size=5`;
        return this.http.get(url);
    }

    getTopUsers(userType) {
        const url = `${this.basePath}/dashboard/topusersbygroup/0?grp=${userType}`;
        return this.http.get(url);
    }
}
