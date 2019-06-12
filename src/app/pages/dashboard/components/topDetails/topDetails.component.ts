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
        { type: 'user', value: 'Svc-ROpitz', score: 54, img: true },
        { type: 'ip', value: '172.10.10.11', score: 200, img: false },
        { type: 'ip', value: '82.102.21.217', score: 180, img: false },
        { type: 'ip', value: '95.181.116.77', score: 125, img: false },
        { type: 'ip', value: '23.94.213.6', score: 86, img: false },
        { type: 'ip', value: '69.249.19.217', score: 25, img: false },
        { type: 'host', value: 'PUNDESK001', score: 180, img: false },
        { type: 'host', value: 'USADESK25', score: 89, img: false },
        { type: 'host', value: 'CHNLAP963', score: 65, img: false },
        { type: 'host', value: 'LONDESK588', score: 49, img: false },
        { type: 'host', value: 'AUSLAP4873', score: 30, img: false }
    ];    
      
    terminatedUsersObjects = [
        { type: 'user', value: 'Marci Belfield', score: 119, img: true },
        { type: 'user', value: 'Christie Mays', score: 91, img: true },
        { type: 'user', value: 'Shaquita', score: 79, img: true },
        { type: 'user', value: 'Tandy', score: 62, img: true },
        { type: 'user', value: 'Oralee Tena', score: 59, img: true }
    ];

    orphanUsersObjects = [
        { type: 'user', value: 'Brunilda', score: 97, img: true },
        { type: 'user', value: 'Juliann Chadwell', score: 91, img: true },
        { type: 'user', value: 'Adella Morrow', score: 85, img: true },
        { type: 'user', value: 'Beth Gee', score: 76, img: true },
        { type: 'user', value: 'Drusilla', score: 63, img: true }
    ];
  
    externalUsersObjects = [
        { type: 'user', value: 'Tomika Napoleon', score: 133, img: true },
        { type: 'user', value: 'Stella', score: 95, img: true },
        { type: 'user', value: 'Glendora', score: 86, img: true },
        { type: 'user', value: 'Antonietta', score: 75, img: true },
        { type: 'user', value: 'Coral', score: 69, img: true }
    ];

    riskyCloudUsersObjects = [
        { type: 'user', value: 'Tina ', score: 131, img: true },
        { type: 'user', value: 'Roger Tilton', score: 94, img: true },
        { type: 'user', value: 'Lorenza Hurrell', score: 83, img: true },
        { type: 'user', value: 'Sarah Carmichael', score: 77, img: true },
        { type: 'user', value: 'Maile', score: 72, img: true }
    ];

    privilegedUsersObjects = [
        { type: 'user', value: 'Dannette Gratton', score: 104, img: true },
        { type: 'user', value: 'Kylie Mier', score: 71, img: true },
        { type: 'user', value: 'Sondra Hildebrand', score: 62, img: true },
        { type: 'user', value: 'Darrin Kerrigan', score: 57, img: true },
        { type: 'user', value: 'Heidy', score: 52, img: true }
    ];

    dormantUsersObjects = [
        { type: 'user', value: 'Chrystal Marois', score: 124, img: true },
        { type: 'user', value: 'Shayla Simo', score: 95, img: true },
        { type: 'user', value: 'Adella Morrow', score: 84, img: true },
        { type: 'user', value: 'Maragret', score: 67, img: true },
        { type: 'user', value: 'Hazel', score: 61, img: true }
    ];
    
    serviceAccountObjects = [
        { type: 'user', value: 'Chieko Montesino', score: 112, img: true },
        { type: 'user', value: 'Charlotte', score: 98, img: true },
        { type: 'user', value: 'Adella Morrow', score: 76, img: true },
        { type: 'user', value: 'Mendelson', score: 65, img: true },
        { type: 'user', value: 'Lura Feiler', score: 59, img: true }
    ];

    watchlistedUsersObjects = [
        { type: 'user', value: 'Kazuko ', score: 137, img: true },
        { type: 'user', value: 'Yamasaki', score: 107, img: true },
        { type: 'user', value: 'Nada Scheerer', score: 93, img: true },
        { type: 'user', value: 'Alysa', score: 72, img: true },
        { type: 'user', value: 'Nita', score: 68, img: true }
    ];
  
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

    constructor(private topDetailsService: TopDetailsService) {
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');

        this.riskyObjects.sort((a, b) => -(a.score - b.score)); // desending order

        
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
        this.selectedRiskies = this.riskyObjects.filter(risky => risky.type == 'user');
    }

    getPrivilegedUsers() {
        this.privilegedUsers = this.privilegedUsersObjects.filter(risky => risky.type == 'user');
        this.privilegedUsers.sort((a, b) => -(a.score - b.score));
    }

    getTerminatedUsers() {
        this.terminatedUsers = this.terminatedUsersObjects.filter(risky => risky.type == 'user');
        this.terminatedUsers.sort((a, b) => -(a.score - b.score));
    }

    getOrphanUsers() {
        this.orphanUsers = this.orphanUsersObjects.filter(risky => risky.type == 'user');
        this.orphanUsers.sort((a, b) => -(a.score - b.score));
    }

    getExternalUsers() {
        this.externalUsers = this.externalUsersObjects.filter(risky => risky.type == 'user');
        this.externalUsers.sort((a, b) => -(a.score - b.score));
    }

    getRiskyCloudUsers() {
        this.riskyCloudUsers = this.riskyCloudUsersObjects.filter(risky => risky.type == 'user');
        this.riskyCloudUsers.sort((a, b) => -(a.score - b.score));
    }

    getDormantUsers() {
        this.dormantUsers = this.dormantUsersObjects.filter(risky => risky.type == 'user');
        this.dormantUsers.sort((a, b) => -(a.score - b.score));
    }

    getServiceAccounts() {
        this.serviceAccount = this.serviceAccountObjects.filter(risky => risky.type == 'user');
        this.serviceAccount.sort((a, b) => -(a.score - b.score));
    }

    getWatchlistedUsers() {
        this.watchlistedUsers = this.watchlistedUsersObjects.filter(risky => risky.type == 'user');
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
}
