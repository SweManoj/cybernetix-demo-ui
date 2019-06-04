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
        { type: 'user', value: 'ADittmer', score: 100, img: true },
        { type: 'user', value: 'Adm-EMoor', score: 234, img: true },
        { type: 'user', value: 'Adm-ADittmer', score: 123, img: true },
        { type: 'user', value: 'AWendler', score: 452, img: true },
        { type: 'user', value: 'Svc-ROpitz', score: 12, img: true },
        { type: 'ip', value: '172.10.10.11', score: 2, img: false },
        { type: 'ip', value: '172.10.10.11', score: 453, img: false },
        { type: 'ip', value: '172.10.10.11', score: 12, img: false },
        { type: 'ip', value: '172.10.10.11', score: 567, img: false },
        { type: 'ip', value: '172.10.10.11', score: 23, img: false },
        { type: 'host', value: 'India', score: 453, img: false },
        { type: 'host', value: 'China', score: 23, img: false },
        { type: 'host', value: 'America', score: 567, img: false },
        { type: 'host', value: 'Japan', score: 34, img: false },
        { type: 'host', value: 'London', score: 124, img: false }
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
        this.topDetailsService.getTopViolations().subscribe((res: any) => {
            this.violationsList = res.data;
            this.violationsList.sort((a, b) => {
                return b.count - a.count;
            });
        });
    }
}
