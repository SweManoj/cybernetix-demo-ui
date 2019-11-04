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
    insights: any;
    violationsList: any[];

    @Input() componentType: string;

    threatVectors = [
        { id: 'Data Exfiltration', count: 6 },
        { id: 'Reconnaissance', count: 3 },
        { id: 'Account Compromise', count: 3 },
        { id: 'Insider Threat', count: 2 },
        { id: 'Lateral Movement', count: 1 },
    ];

    topRiskyImpersonations = [
        { image: 'assets/images/users/Adm-EMoor.jpg', entity: 'Adm-EMoor', incident: 'INC 38', type: 'user', riskScore: 95 },
        { image: 'assets/images/dashboard_icons/Ip@2x.png', entity: '10.82.32.212', incident: 'INC 71', type: 'ip', riskScore: 95 },
        { image: 'assets/images/users/Chen_Zhang.jpg', entity: 'Chen_Zhang', incident: 'INC 44', type: 'user', riskScore: 93 }
    ];

    impersonationIncidentRouting(incident) {
        this.router.navigate(['/riskyIncident', incident]);
    }

    routeRiskyCorrelations(type, entity) {
        if (type == 'user')
            this.router.navigate(['/riskyUser', entity]);
        else
            this.router.navigate(['/riskyIP', entity]);
    }

    riskyObjects = [
        { type: 'user', value: 'Glenn_Roberto', score: 93, img: true },
        // { type: 'user', value: 'ADittmer', score: 94, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 95, img: true },
        // { type: 'user', value: 'SSmith1', score: 90, img: true },
        { type: 'user', value: 'AWendler', score: 97, img: true },
        { type: 'user', value: 'Chen_Zhang', score: 93, img: true },
        { type: 'user', value: 'Scott_Edwin', score: 92, img: true },
        // { type: 'user', value: 'Svc-ROpitz', score: 54, img: true },

        { type: 'ip address', value: '18.10.8.1', score: 93, img: false },
        { type: 'ip address', value: '10.82.32.212', score: 95, img: false },
        // { type: 'ip address', value: '82.102.21.217', score: 60, img: false },
        { type: 'ip address', value: '95.181.116.77', score: 85, img: false },
        // { type: 'ip address', value: '23.94.213.6', score: 89, img: false },
        { type: 'ip address', value: '69.249.19.217', score: 76, img: false },
        // { type: 'ip address', value: '172.168.200.55', score: 93, img: false },
        // { type: 'ip address', value: '10.82.34.101', score: 93, img: false },

        { type: 'ip address', value: '10.82.69.151', score: 94, img: false },
        { type: 'ip address', value: '10.82.34.107', score: 93, img: false },
        { type: 'ip address', value: '10.82.71.192', score: 96, img: false },

        { type: 'host', value: 'AUSLAP4873', score: 90, img: false },
        { type: 'host', value: 'AWS-DomainEC2-Instance07', score: 92, img: false },
        { type: 'host', value: 'AWS-S3-Instance01', score: 98, img: false },
        { type: 'host', value: 'WK-1929304D', score: 93, img: false },
        // { type: 'host', value: 'PUNDESK001', score: 30, img: false },
        { type: 'host', value: 'USADESK25', score: 89, img: false },
        // { type: 'host', value: 'CHNLAP963', score: 66, img: false },
        // { type: 'host', value: 'LONDESK588', score: 88, img: false }
        { type: 'host', value: 'DESK-10982', score: 95, img: false },
        { type: 'host', value: 'DESK-1456', score: 95, img: false },
        { type: 'host', value: 'DESK-1576', score: 95, img: false }
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
            /* { score: 80, image: 'sibi025' },
            { score: 75, image: 'mahi521' },
            { score: 63, image: 'abhi035' } */
        ],
        externalUsersObjects: [
            { score: 88, image: 'JohnS' },
            { score: 95, image: 'Tino_Best' },
            { score: 86, image: 'Maile' },
            { score: 75, image: 'Sam_Carman' },
            // { score: 69, image: 'Kylie Mier' }
        ],
        riskyCloudUsersObjects: [
            { score: 88, image: 'Heidy' },
            { score: 91, image: 'Sondra Hildebrand' },
            { score: 69, image: 'Ross_Despares' },
            /* { score: 79, image: 'Maragret' },
            { score: 45, image: 'Hazel' } */
        ],
        privilegedUsersObjects: [
            { score: 90, image: 'SSmith1' },
            { score: 87, image: 'Maile' },
            { score: 62, image: 'Shayla Simo' },
            { score: 57, image: 'Tino_Best' },
            { score: 49, image: 'Coral' }
        ],
        dormantUsersObjects: [
            { score: 72, image: 'Charlotte' },
            { score: 87, image: 'Mendelson' },
            { score: 84, image: 'Kazuko' },
            { score: 67, image: 'Nita' },
            { score: 51, image: 'Nada Scheerer' }
        ],
        serviceAccountObjects: [
            { score: 70, image: 'Drusilla' },
            { score: 98, image: 'Heidy' },
            { score: 76, image: 'Steven' },
            { score: 65, image: 'Coral' },
            { score: 59, image: 'Tino_Best' }
        ],
        watchlistedUsersObjects: [
            { score: 90, image: 'SSmith1' },
            { score: 82, image: 'Alysa' },
            { score: 78, image: 'Tino_Best' },
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

    constructor(private router: Router) {

        this.riskyObjects.sort((a, b) => -(a.score - b.score)); // desending order
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
        this.selectedRiskies = this.selectedRiskies.splice(0, 4);
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
        this.selectedRiskies = this.selectedRiskies.splice(0, 5);
        this.selectRiskyType = String(val).toUpperCase();
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        switch (this.componentType) {
            case 'riskyUser':
                this.getRiskyUser();
                break;
            case 'topInsights':
                this.getInsights();
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

    getInsights() {
        /* this.topDetailsService.getTopThreats().subscribe((res: any) => {
            for (const threat of res.data) {
                const genDate = threat.displaytimestamp.generatedTimestampISODate;
                threat.daysFromNow = moment(genDate,'YYYYMMDD').fromNow();
                threat.days = moment(genDate).format('ddd, DD MMM YY');
                threat.time = moment(genDate).format('hh:mm:ss');
            }
            this.threatsList = res.data;  - dynamic value from db
        }); */

        this.insights = [
            {
                title: 'Failed Login Attempts On Same IP By Multiple Users',
                count: 13,
                pvId: 'PV01'
            },
            {
                title: 'Abnormal Beaconing from Host - Proxy',
                count: 11,
                pvId: 'PV02'
            },
            {
                title: 'Interactive login attempt by user without BadgeIN',
                count: 9,
                pvId: 'PV03'
            },
            {
                title: 'Rare Host Usage',
                count: 7,
                pvId: 'PV04'
            },
            {
                title: 'Abnormal Outbound Connections From Host',
                count: 3,
                pvId: 'PV05'
            }
        ];

        this.insights.sort((a, b) => b.count - a.count);
    }

    getViolations() {
        /* this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violationsList = res.data;
            this.violationsList.sort((a, b) => b.count - a.count);
        }); */
        // this.threatVectors.sort((a, b) => a.count - b.count);
    }

    riskyUserTimeline(selectedEntity: any) {
        switch (this.selectRiskyType) {
            case 'IP ADDRESS': this.router.navigateByUrl('/riskyIP/' + selectedEntity);
                break;
            case 'USER': this.router.navigateByUrl('/riskyUser/' + selectedEntity);
                break;
            case 'HOST':
                this.router.navigateByUrl('/riskyHost/' + selectedEntity);
                /* if (selectedEntity == 'WK-1929304D')
                    this.router.navigateByUrl('/riskyUser/' + 'Chen_Zhang');
                else
                    this.router.navigateByUrl('/riskyHost/' + selectedEntity); */
                break;
        }
    }
}
