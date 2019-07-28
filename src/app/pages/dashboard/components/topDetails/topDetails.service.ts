import { Injectable } from '@angular/core';
import { UserContext } from '../../../../core/services/userContext';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class TopDetailsService {

    mainURL: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.mainURL = `${environment.serverUrl}`;
    }

    getUploadExceedData() {
        const url = `${this.mainURL}/api/dashboard/firewallRiskyUsers?records=5`;
        return this.http.get(url);
    }

    getTopThreats() {
        const url = `${this.mainURL}/dashboard/topThreats/0`;
        return this.http.get(url);
    }

    getTopViolations() {
        const url = `${this.mainURL}/dashboard/violations/0?offset=0&size=6`;
        return this.http.get(url);
    }

    getTopRiskyUsers(entityType) {
        const url = `${this.mainURL}/dashboard/violators/0/${entityType}?offset=0&size=5`;
        return this.http.get(url);
    }

    getTopUsers(userType) {
        const url = `${this.mainURL}/dashboard/topusersbygroup/0?grp=${userType}`;
        return this.http.get(url);
    }

}
