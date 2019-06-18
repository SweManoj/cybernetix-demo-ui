import { Injectable } from '@angular/core';
import { UserContext } from '../../../../core/services/userContext';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TopDetailsService {

    basePath: string;

    constructor(private http: HttpClient, private userContext: UserContext) {
        this.basePath = this.userContext.getBasePath();
    }

    getUploadExceedData() {
        const url = `${this.basePath}/api/dashboard/firewallRiskyUsers?records=5`;
        return this.http.get(url);
    }

    getTopThreats() {
        const url = `${this.basePath}/api/dashboard/getThreats?records=5`;
        return this.http.get(url);
    }

    getTopViolations() {
        const url = `${this.basePath}/api/dashboard/getViolations?records=4`;
        return this.http.get(url);
    }

}
