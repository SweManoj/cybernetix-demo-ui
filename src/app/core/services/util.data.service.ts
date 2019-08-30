import {Injectable} from '@angular/core';

@Injectable()
export class UtilDataService {

    filteredRiskyUsers: any[] = [];
    filteredRiskyHost: any[] = [];
    filteredRiskyIPAddress: any[] = [];

    getFilteredRiskyUsers(): any[] {
        return this.filteredRiskyUsers;
    }

    getFilteredRiskyHosts(): any[] {
        return this.filteredRiskyHost;
    }

    getFilteredRiskyIPAddresses(): any[] {
        return this.filteredRiskyIPAddress;
    }

}
