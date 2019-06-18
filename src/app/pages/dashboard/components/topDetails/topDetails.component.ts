import { AfterViewInit, Component, Input, ViewChild,  } from '@angular/core';
import { TopDetailsService } from './topDetails.service';
import { Table } from 'primeng/table';
import {ActivatedRoute, Router} from '@angular/router';
// import {routerTransition} from '../../router.animations';

@Component({
    selector: 'top-details',
    templateUrl: './topDetails.component.html'
})
export class TopDetailsComponent implements AfterViewInit {

    selectRiskyType = 'USER';
    riskUsersList;
    threatsList: any[];
    violationsList: any[];

    @Input() componentType: string;

   

    topRiskyObjects = {
        terminatedUsersObjects: [
            { score: 119, image: 'Yamasaki' },
            { score: 91, image: 'Shaquita' },
            { score: 79, image: 'Tandy' },
            { score: 62, image: 'Alysa' },
            { score: 59, image: 'Beth Gee' }
        ],
        orphanUsersObjects: [
            { score: 97, image: 'agga787' },
            { score: 91, image: ' philip392' },
            { score: 85, image: 'sibi025' },
            { score: 76, image: 'mahi521' },
            { score: 63, image: 'abhi035' }
        ],
        externalUsersObjects: [
            { score: 133, image: 'Coral' },
            { score: 95, image: 'Tina' },
            { score: 86, image: 'Maile' },
            { score: 75, image: 'Sarah Carmichael' },
            { score: 69, image: 'Kylie Mier' }
        ],
        riskyCloudUsersObjects: [
            { score: 131, image: 'Heidy' },
            { score: 91, image: 'Sondra Hildebrand' },
            { score: 69, image: 'Kylie Mier' },
            { score: 79, image: 'Maragret' },
            { score: 45, image: 'Hazel' }
        ],
        privilegedUsersObjects: [
            { score: 104, image: 'Maile' },
            { score: 71, image: 'Stella' },
            { score: 62, image: 'Shayla Simo' },
            { score: 57, image: 'Tina' },
            { score: 49, image: 'Coral' }
        ],
        dormantUsersObjects: [
            { score: 124, image: 'Charlotte' },
            { score: 96, image: 'Mendelson' },
            { score: 84, image: 'Kazuko' },
            { score: 67, image: 'Nita' },
            { score: 51, image: 'Nada Scheerer' }
        ],
        serviceAccountObjects: [
            { score: 112, image: 'Drusilla' },
            { score: 98, image: 'Heidy' },
            { score: 76, image: 'Steven' },
            { score: 65, image: 'Coral' },
            { score: 59, image: 'Tina' }
        ],
        watchlistedUsersObjects: [
            { score: 137, image: 'Tina' },
            { score: 107, image: 'Alysa' },
            { score: 93, image: 'Brunilda' },
            { score: 72, image: 'Yamasaki' },
            { score: 68, image: 'Stella' }
        ]
    }

    assignee = [{ name: 'User', value: 'user' }, { name: 'IP Address', value: 'ip' }, { name: 'Host', value: 'host' }];

    selectedRiskies: any[];
    privilegedUsers: any[];
    dormantUsers: any[];
    serviceAccount: any[];
    watchlistedUsers: any[];
    terminatedUsers: any[];
    orphanUsers: any[];
    externalUsers: any[];
    riskyCloudUsers: any[];

    @ViewChild('selectedRiskyType') riskyTypeTable: Table;
    riskyTypeSelected = 'user';

    constructor(private topDetailsService: TopDetailsService,
        private router: Router
    ) {
        this.selectedRiskies = this.topDetailsService.riskyObjects.filter(riskyObj => riskyObj.type == 'user');

        // this.riskyObjects.sort((a, b) => -(a.score - b.score)); -- desending order
    }

    SelectedRiskyType(val:any) {
        debugger
        this.riskyTypeSelected = val;

        this.selectedRiskies = this.topDetailsService.riskyObjects.filter(riskyObj => riskyObj.type == this.riskyTypeSelected);
        this.selectRiskyType =  String(val).toUpperCase();;
    }

    ngAfterViewInit() {
        switch (this.componentType) {
            case 'riskyUser':
                this.getRiskyUser();
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

    getRiskyUser() {
        /* this.topDetailsService.getUploadExceedData().subscribe((res: any) => {
            this.riskUsersList = res.data;
            this.riskUsersList.sort((a, b) => {
                return b.riskscore - a.riskscore;
            });
        }); */
        this.selectedRiskies = this.topDetailsService.riskyObjects.filter(risky => risky.type == 'user');
    }

    getPrivilegedUsers() {
        this.privilegedUsers = this.topRiskyObjects.privilegedUsersObjects;
        this.privilegedUsers.sort((a, b) => -(a.score - b.score));
    }

    getTerminatedUsers() {
        this.terminatedUsers = this.topRiskyObjects.terminatedUsersObjects;
        this.terminatedUsers.sort((a, b) => -(a.score - b.score));
    }

    getOrphanUsers() {
        this.orphanUsers = this.topRiskyObjects.orphanUsersObjects;
        this.orphanUsers.sort((a, b) => -(a.score - b.score));
    }

    getExternalUsers() {
        this.externalUsers = this.topRiskyObjects.externalUsersObjects;
        this.externalUsers.sort((a, b) => -(a.score - b.score));
    }

    getRiskyCloudUsers() {
        this.riskyCloudUsers = this.topRiskyObjects.riskyCloudUsersObjects;
        this.riskyCloudUsers.sort((a, b) => -(a.score - b.score));
    }

    getDormantUsers() {
        this.dormantUsers = this.topRiskyObjects.dormantUsersObjects;
        this.dormantUsers.sort((a, b) => -(a.score - b.score));
    }

    getServiceAccounts() {
        this.serviceAccount = this.topRiskyObjects.serviceAccountObjects;
        this.serviceAccount.sort((a, b) => -(a.score - b.score));
    }

    getWatchlistedUsers() {
        this.watchlistedUsers = this.topRiskyObjects.watchlistedUsersObjects;
        this.watchlistedUsers.sort((a, b) => -(a.score - b.score));
    }

    getThreats() {
        /* this.topDetailsService.getTopThreats().subscribe((res: any) => {
            for (const threat of res.data) {
                const genDate = threat.displaytimestamp.generatedTimestampISODate;
                threat.daysFromNow = moment(genDate,'YYYYMMDD').fromNow();
                threat.days = moment(genDate).format('ddd, DD MMM YY');
                threat.time = moment(genDate).format('hh:mm:ss');
            }
            this.threatsList = res.data;  - dynamic value from db
        }); */

        this.threatsList = [
            {
                title: 'Abnormal Beaconing from Host - Proxy',
                count: 47
            },
            {
                title: 'Failed Login Attempts On Same IP By Multiple Users',
                count: 93
            },
            {
                title: 'Interactive login attempt by user without badge activity',
                count: 18
            },
            {
                title: 'Abnormal Outbound Connections From Host',
                count: 3
            },
            {
                title: 'Rare Host Usage',
                count: 11
            }
        ];

        this.threatsList.sort((a, b) => b.count - a.count);
    }

    getViolations() {
        this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violationsList = res.data;
            this.violationsList.sort((a, b) => b.count - a.count);
        });
    }

    riskyUserTimeline(selectedUser: any) {
        debugger
        this.router.navigateByUrl('/riskyUser/' + selectedUser);
    }
}
