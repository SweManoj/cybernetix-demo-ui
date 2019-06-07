import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { TopDetailsService } from './topDetails.service';
import { Table } from 'primeng/table';

@Component({
    selector: 'top-details',
    templateUrl: './topDetails.component.html'
})
export class TopDetailsComponent implements AfterViewInit {

    riskUsersList;
    threatsList;
    violationsList;

    @Input() componentType: string;

    riskyObjects = [
        { type: 'user', value: 'ADittmer', score: 250, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 234, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 180, img: true },
        { type: 'user', value: 'AWendler', score: 96, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 44, img: true },
        { type: 'ip', value: '172.10.10.11', score: 200, img: false },
        { type: 'ip', value: '172.10.10.11', score: 180, img: false },
        { type: 'ip', value: '172.10.10.11', score: 125, img: false },
        { type: 'ip', value: '172.10.10.11', score: 86, img: false },
        { type: 'ip', value: '172.10.10.11', score: 25, img: false },
        { type: 'host', value: 'Primesoft NZ LTD', score: 180, img: false },
        { type: 'host', value: 'Beijing Sanxin Shidai Co.Ltd', score: 89, img: false },
        { type: 'host', value: 'CHINANET-HN Hengyang', score: 65, img: false },
        { type: 'host', value: 'LLC Kvazar Telecom', score: 49, img: false },
        { type: 'host', value: 'Webhosting.Net', score: 30, img: false }
    ];

    assignee = [{ name: 'User', value: 'user' }, { name: 'IP Address', value: 'ip' }, { name: 'Host', value: 'host' }];
    
    selectedRiskies: any[];
    
    @ViewChild('selectedRiskyType') riskyTypeTable: Table;
    riskyTypeSelected = 'user';

    constructor(private topDetailsService: TopDetailsService) {
        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == 'user');
    }

    SelectedRiskyType($event) {
        this.riskyTypeSelected = $event.value.value;

        this.selectedRiskies = this.riskyObjects.filter(riskyObj => riskyObj.type == this.riskyTypeSelected)
    }

    ngAfterViewInit() {
        if (this.componentType === 'riskyUser') {
            this.getRiskyUser();
        }
        if (this.componentType === 'topThreats') {
            this.getThreats();
        }
        if (this.componentType === 'topViolations') {
            this.getViolations();
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
    
    getThreats() {
        this.topDetailsService.getTopThreats().subscribe((res: any) => {
            /*for (const threat of res.data) {
                const genDate = threat.displaytimestamp.generatedTimestampISODate;
                threat.daysFromNow = moment(genDate,'YYYYMMDD').fromNow();
                threat.days = moment(genDate).format('ddd, DD MMM YY');
                threat.time = moment(genDate).format('hh:mm:ss');
            }*/
            this.threatsList = res.data;
        });
    }
    getViolations() {
        debugger;
        this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violationsList = res.data;
            this.violationsList.sort((a, b) => {
                return b.count - a.count;
            });
        });
    }
}
