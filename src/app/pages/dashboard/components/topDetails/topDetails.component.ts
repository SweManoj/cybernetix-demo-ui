import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TopDetailsService } from './topDetails.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'top-details',
    templateUrl: './topDetails.component.html'
})
export class TopDetailsComponent implements AfterViewInit {

    riskUsersList;
    threatsList: any[];
    violationsList;

    @Input() componentType: string;

    riskyObjects = [
        { type: 'user', value: 'ADittmer', score: 94, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 89, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 81, img: true },
        { type: 'user', value: 'AWendler', score: 72, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 65, img: true },
        { type: 'ip', value: '172.10.10.11', score: 200, img: false },
        { type: 'ip', value: '172.10.10.11', score: 180, img: false },
        { type: 'ip', value: '172.10.10.11', score: 125, img: false },
        { type: 'ip', value: '172.10.10.11', score: 86, img: false },
        { type: 'ip', value: '172.10.10.11', score: 25, img: false },
        { type: 'host', value: 'PUNDESK001', score: 180, img: false },
        { type: 'host', value: 'USADESK25', score: 89, img: false },
        { type: 'host', value: 'CHNLAP963', score: 65, img: false },
        { type: 'host', value: 'LONDESK588', score: 49, img: false },
        { type: 'host', value: 'AUSLAP4873', score: 30, img: false }
    ];

    assignee = [{ name: 'User', value: 'user' }, { name: 'IP Address', value: 'ip' }, { name: 'Host', value: 'host' }];

    selectedRiskies: any[];
    privilegedUsers: any[];
    dormantUsers: any[];
    serviceAccount: any[];
    watchlistedUsers: any[];

    @ViewChild('selectedRiskyType') riskyTypeTable: Table;
    riskyTypeSelected = 'user';

    constructor(private topDetailsService: TopDetailsService) {
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');

        this.riskyObjects.sort((a, b) => a.score - b.score); // desending order
    }

    SelectedRiskyType($event) {
        this.riskyTypeSelected = $event.value.value;

        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == this.riskyTypeSelected)
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
        }
    }

    getRiskyUser() {
        /* this.topDetailsService.getUploadExceedData().subscribe((res: any) => {
            this.riskUsersList = res.data;
            this.riskUsersList.sort((a, b) => {
                return b.riskscore - a.riskscore;
            });
        }); */
        this.selectedRiskies = this.riskyObjects.filter(risky => risky.type == 'user');
    }

    getPrivilegedUsers() {
        this.privilegedUsers = this.riskyObjects.filter(risky => risky.type == 'user');
        this.privilegedUsers.sort((a, b) => a.score - b.score);
    }

    getDormantUsers() {
        this.dormantUsers = this.riskyObjects.filter(risky => risky.type == 'user');
        this.dormantUsers.sort((a, b) => a.score - b.score);
    }

    getServiceAccounts() {
        this.serviceAccount = this.riskyObjects.filter(risky => risky.type == 'user');
        this.serviceAccount.sort((a, b) => a.score - b.score);
    }

    getWatchlistedUsers() {
        this.watchlistedUsers = this.riskyObjects.filter(risky => risky.type == 'user');
        this.watchlistedUsers.sort((a, b) => a.score - b.score);
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
                title: 'Multiple users logged-in  successfully from same IP',
                count: 47
            },
            {
                title: 'Same IP is used for failed login attempts by 4 or more accounts',
                count: 93
            },
            {
                title: 'Interactive login attempt by user without badge activity',
                count: 18
            },
            {
                title: 'Failed interactive login attempts by users without proper username',
                count: 3
            },
            {
                title: 'Same user tried to login from 4 or more IP addresses',
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
}
