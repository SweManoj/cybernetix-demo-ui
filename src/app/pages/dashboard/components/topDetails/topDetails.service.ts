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
    riskyObjects = [
        { type: 'user', value: 'ADittmer', score: 94, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 89, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 81, img: true },
        { type: 'user', value: 'AWendler', score: 72, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 54, img: true },
        { type: 'ip address', value: '172.10.10.11', score: 200, img: false },
        { type: 'ip address', value: '82.102.21.217', score: 180, img: false },
        { type: 'ip address', value: '95.181.116.77', score: 125, img: false },
        { type: 'ip address', value: '23.94.213.6', score: 86, img: false },
        { type: 'ip address', value: '69.249.19.217', score: 25, img: false },
        { type: 'host', value: 'PUNDESK001', score: 180, img: false },
        { type: 'host', value: 'USADESK25', score: 89, img: false },
        { type: 'host', value: 'CHNLAP963', score: 65, img: false },
        { type: 'host', value: 'LONDESK588', score: 49, img: false },
        { type: 'host', value: 'AUSLAP4873', score: 30, img: false }
    ];
}
