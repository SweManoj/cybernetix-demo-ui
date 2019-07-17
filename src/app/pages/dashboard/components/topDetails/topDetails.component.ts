import { AfterViewInit, Component, Input, ViewChild, } from '@angular/core';
import { TopDetailsService } from './topDetails.service';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
// import {routerTransition} from '../../router.animations';

@Component({
    selector: 'top-details',
    templateUrl: './topDetails.component.html'
})
export class TopDetailsComponent implements AfterViewInit {

    selectRiskyType = 'USER';
    riskUsersList;
    threats: any;
    violations: any[];

    @Input() componentType: string;

    threatVectors = [
        { id: 'Beaconing', count: 85 },
        { id: 'Phishing', count: 69 },
        { id: 'Data Exfiltration', count: 54 },
        { id: 'Cyber Threat', count: 12 },
        { id: 'Flight Risk', count: 9 }
    ];
    /* { type: 'user', value: 'ADittmer', score: 94, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 89, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 81, img: true },
        { type: 'user', value: 'AWendler', score: 97, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 54, img: true },*/

    riskyObjects = [
       
        { type: 'ip address', value: '10.82.32.212', score: 95, img: false, entityId : '10.82.32.212' },
        { type: 'ip address', value: '82.102.21.217', score: 60, img: false, entityId : '82.102.21.217'  },
        { type: 'ip address', value: '95.181.116.77', score: 85, img: false, entityId : '95.181.116.77'  },
        { type: 'ip address', value: '23.94.213.6', score: 89, img: false, entityId : '23.94.213.6'  },
        { type: 'ip address', value: '69.249.19.217', score: 76, img: false, entityId : '69.249.19.217'  },
        { type: 'host', value: 'PUNDESK001', score: 30, img: false, entityId : 'PUNDESK001'  },
        { type: 'host', value: 'USADESK25', score: 89, img: false, entityId : 'USADESK25'  },
        { type: 'host', value: 'CHNLAP963', score: 66, img: false , entityId : 'CHNLAP963' },
        { type: 'host', value: 'LONDESK588', score: 95, img: false , entityId : 'LONDESK588' },
        { type: 'host', value: 'AUSLAP4873', score: 70, img: false , entityId : 'AUSLAP4873' }
    ];

    topRiskyObjects = {
        terminatedUsersObjects: [
            { score: 97, image: 'Yamasaki' },
            { score: 91, image: 'Shaquita' },
            { score: 79, image: 'Tandy' },
            { score: 62, image: 'Alysa' },
            { score: 59, image: 'Beth Gee' }
        ],
        orphanUsersObjects: [
            { score: 94, image: 'agga787' },
            { score: 88, image: ' philip392' },
            { score: 80, image: 'sibi025' },
            { score: 75, image: 'mahi521' },
            { score: 63, image: 'abhi035' }
        ],
        externalUsersObjects: [
            { score: 54, image: 'Coral' },
            { score: 95, image: 'Tina' },
            { score: 86, image: 'Maile' },
            { score: 75, image: 'Sarah Carmichael' },
            { score: 69, image: 'Kylie Mier' }
        ],
        riskyCloudUsersObjects: [
            { score: 83, image: 'Heidy' },
            { score: 91, image: 'Sondra Hildebrand' },
            { score: 69, image: 'Kylie Mier' },
            { score: 79, image: 'Maragret' },
            { score: 45, image: 'Hazel' }
        ],
        privilegedUsersObjects: [
            { score: 98, image: 'Maile' },
            { score: 71, image: 'Stella' },
            { score: 62, image: 'Shayla Simo' },
            { score: 57, image: 'Tina' },
            { score: 49, image: 'Coral' }
        ],
        dormantUsersObjects: [
            { score: 72, image: 'Charlotte' },
            { score: 96, image: 'Mendelson' },
            { score: 84, image: 'Kazuko' },
            { score: 67, image: 'Nita' },
            { score: 51, image: 'Nada Scheerer' }
        ],
        serviceAccountObjects: [
            { score: 70, image: 'Drusilla' },
            { score: 98, image: 'Heidy' },
            { score: 76, image: 'Steven' },
            { score: 65, image: 'Coral' },
            { score: 59, image: 'Tina' }
        ],
        watchlistedUsersObjects: [
            { score: 93, image: 'Tina' },
            { score: 82, image: 'Alysa' },
            { score: 78, image: 'Brunilda' },
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
        private router: Router) {
        this.topDetailsService.getTopRiskyUsers('USER').subscribe((res: any) => {
            res.forEach(data => {
               this.riskyObjects.push({type: 'user', entityId: data.entityId, score: Math.round(data.riskScore), img: true, value : data.user.u_firstName + ' ' + data.user.u_lastName });
            });
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
        this.riskyObjects.sort((a, b) => -(a.score - b.score)); // desending order
        });
        
        
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65)
            return "limegreen";
        else if (riskScore > 65 && riskScore <= 79)
            return "darkorange";
        else
            return "crimson";
    }

    SelectedRiskyType(val: any) {
        this.riskyTypeSelected = val;
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == this.riskyTypeSelected);
        this.selectRiskyType = String(val).toUpperCase();;
    } 
    
    ngAfterViewInit(){

    }
    ngOnInit() {
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
        this.selectedRiskies = this.riskyObjects.filter(risky => risky.type == 'user');
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
        this.topDetailsService.getTopThreats().subscribe((res: any) => {
            this.threats = res;
        });

        /*this.threatsList = [
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

        this.threatsList.sort((a, b) => b.count - a.count);*/
    }

    getViolations() {
        this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violations = res;
        });
        // this.threatVectors.sort((a, b) => a.count - b.count);
    }

    riskyUserTimeline(selectedEntity: any) {
        switch (this.selectRiskyType) {
            case 'IP ADDRESS' : this.router.navigateByUrl('/riskyIP/' + selectedEntity);
            break;
            case 'USER' : this.router.navigateByUrl('/riskyUser/' + selectedEntity);
            break;
            case 'HOST' : this.router.navigateByUrl('/riskyHost/' + selectedEntity);
            break;
        }
    }
}
