import {AfterViewInit, Component, Input, OnInit, ViewChild,} from '@angular/core';
import {TopDetailsService} from './topDetails.service';
import {Table} from 'primeng/table';
import {Router} from '@angular/router';

// import {routerTransition} from '../../router.animations';

@Component({
    selector: 'top-details',
    templateUrl: './topDetails.component.html'
})
export class TopDetailsComponent implements OnInit {

    selectRiskyType = 'USER';
    threats: any;
    violations: any[];
    @Input() componentType: string;
    selectedRiskies: any[];
    privilegedUsers = [];
    dormantUsers = [];
    serviceAccount = [];
    watchlistedUsers = [];
    terminatedUsers = [];
    orphanUsers = [];
    externalUsers = [];
    riskyCloudUsers = [];
    riskyObjects = [];


    @ViewChild('selectedRiskyType') riskyTypeTable: Table;
    riskyTypeSelected = 'user';

    constructor(private topDetailsService: TopDetailsService, private router: Router) {}

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65) {
            return 'limegreen';
        } else if (riskScore > 65 && riskScore <= 79) {
            return 'darkorange';
        } else {
            return 'crimson';
        }
    }

    changeRiskyType(val: any) {
        this.riskyTypeSelected = val;
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type === this.riskyTypeSelected);
        this.selectRiskyType = String(val).toUpperCase();
        if (this.selectedRiskies) {
            this.selectedRiskies.sort((a, b) => -(a.score - b.score));
        }
    }

    ngOnInit() {

        switch (this.componentType) {
            case 'riskyEntities':
                this.getRiskyEntities();
                break;
            case 'topThreats':
                this.getThreats();
                break;
            case 'topViolations':
                this.getViolations();
                break;
            case 'privilegedUsers':
                this.getPrivilegedUsers();
                break;
            case 'dormantUsers':
                this.getDormantUsers();
                break;
            case 'serviceAccount':
                this.getServiceAccounts();
                break;
            case 'watchlistedUsers':
                this.getWatchlistedUsers();
                break;
            case 'terminatedUsers':
                this.getTerminatedUsers();
                break;
            case 'orphanUsers':
                this.getOrphanUsers();
                break;
            case 'externalUsers':
                this.getExternalUsers();
                break;
            case 'riskyCloud':
                this.getRiskyCloudUsers();
                break;
        }
    }

    getRiskyEntities() {
        this.topDetailsService.getTopRiskyUsers('USER').subscribe((res: any) => {
            res.forEach(data => {
                const userObj = {
                    type: 'user',
                    entityId: data.u_employeeId,
                    score: Math.round(data.totalRiskScore),
                    img: true,
                    value: data.u_employeeId
                };
                this.riskyObjects.push(userObj);
            });
            this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type === 'user');
            this.selectedRiskies.sort((a, b) => -(a.score - b.score)); // desending order
        });

        this.topDetailsService.getTopRiskyUsers('IP').subscribe((res: any) => {
            res.forEach(data => {
                this.riskyObjects.push({
                    type: 'ip address',
                    entityId: data.ipValue,
                    score: Math.round(data.totalRiskScore),
                    img: true,
                    value: data.ipValue
                });
            });

        });

        this.topDetailsService.getTopRiskyUsers('HOST').subscribe((res: any) => {
            res.forEach(data => {
                this.riskyObjects.push({
                    type: 'host',
                    entityId: data.hostName,
                    score: Math.round(data.totalRiskScore),
                    img: true,
                    value: data.hostName
                });
            });

        });
    }

    getPrivilegedUsers() {
        this.topDetailsService.getTopUsers('Privileged').subscribe((users: any) => {
            this.privilegedUsers = users;
        });
        if (this.privilegedUsers) {
            this.privilegedUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getTerminatedUsers() {
        this.topDetailsService.getTopUsers('Terminated').subscribe((users: any) => {
            this.terminatedUsers = users;
        });
        if (this.terminatedUsers) {
            this.terminatedUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getOrphanUsers() {
        this.topDetailsService.getTopUsers('Orphan').subscribe((users: any) => {
            this.externalUsers = users;
        });
        if (this.orphanUsers) {
            this.orphanUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getExternalUsers() {
        this.topDetailsService.getTopUsers('External').subscribe((users: any) => {
            this.externalUsers = users;
        });
        if (this.externalUsers) {
            this.externalUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getRiskyCloudUsers() {
        this.topDetailsService.getTopUsers('Cloud').subscribe((users: any) => {
            this.riskyCloudUsers = users;
        });
        if (this.riskyCloudUsers) {
            this.riskyCloudUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getDormantUsers() {
        this.topDetailsService.getTopUsers('Dormant').subscribe((users: any) => {
            this.dormantUsers = users;
        });
        if (this.dormantUsers) {
            this.dormantUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getServiceAccounts() {
        this.topDetailsService.getTopUsers('Service').subscribe((users: any) => {
            this.serviceAccount = users;
        });
        if (this.serviceAccount) {
            this.serviceAccount.sort((a, b) => -(a.score - b.score));
        }
    }

    getWatchlistedUsers() {
        this.topDetailsService.getTopUsers('flight').subscribe((users: any) => {
            this.watchlistedUsers = users;
        });
        if (this.watchlistedUsers) {
            this.watchlistedUsers.sort((a, b) => -(a.score - b.score));
        }
    }

    getThreats() {
        this.topDetailsService.getTopThreats().subscribe((res: any) => {
            this.threats = res;
        });
    }

    getViolations() {
        this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violations = res;
        });
    }

    viewRiskyEntityDetails(selectedEntity: any) {
        switch (this.selectRiskyType) {
            case 'IP ADDRESS' :
                this.router.navigateByUrl('/riskyIP/' + selectedEntity);
                break;
            case 'USER' :
                this.router.navigateByUrl('/riskyUser/' + selectedEntity);
                break;
            case 'HOST' :
                this.router.navigateByUrl('/riskyHost/' + selectedEntity);
                break;
        }
    }
}
