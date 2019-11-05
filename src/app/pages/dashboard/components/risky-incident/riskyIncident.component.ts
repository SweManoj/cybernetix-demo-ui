import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tvde23Data, tvde38Data, tvde43Data, tvde21Data, tvrc4Data, tvac92Data, tvde23FirstData, tvde23SecondData } from './data';

@Component({
    selector: 'risky-incident',
    templateUrl: './riskyIncident.component.html'
})
export class RiskyIncidentComponent {

    incidentDetails = [
        {
            incident: 'TVDE38',
            affectedEntity: 'Adm-EMoor, SVL-EMoor, WK-38482L, 10.82.30.121',
            lastUpdatedOn: '23 Sep 2019 09:33',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Closed',
            outcome: 'True Positive',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '136', title: 'Events' },
                { image: 'resources@1x.png', value: '04', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '05', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE21',
            affectedEntity: '10.82.32.212, WK-UKL48503D, 10.82.32.227, 00:0a:95:9d:68:16',
            lastUpdatedOn: '27 June 2019 12:45',
            lastUpdatedBy: 'Scott R',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '59', title: 'Events' },
                { image: 'resources@1x.png', value: '03', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '04', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE43',
            affectedEntity: 'Chen_Zhang, Steve_Warner, Ross_Liam, adm_RL93, WK-1929304D',
            lastUpdatedOn: '13 Oct 2019 10:13',
            lastUpdatedBy: 'Steve D',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '108', title: 'Events' },
                { image: 'resources@1x.png', value: '02', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '05', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVAC92',
            affectedEntity: 'AWendler',
            lastUpdatedOn: '13 June 2019 06:22',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Closed',
            outcome: 'True Positive',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '351', title: 'Events' },
                { image: 'resources@1x.png', value: '06', title: 'Resources' },
                { image: 'Shape@1x.png', value: '02', title: 'Locations' },
                { image: 'violations@1x.png', value: '09', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVRC4',
            affectedEntity: 'AWS-S3-Instance01,Glenn_Roberto,AWS-DomainEC2-Instance07,18.10.8.1',
            lastUpdatedOn: '4 Oct 2019 03:50',
            lastUpdatedBy: 'Martin J',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '482', title: 'Events' },
                { image: 'resources@1x.png', value: '04', title: 'Resources' },
                { image: 'Shape@1x.png', value: '01', title: 'Locations' },
                { image: 'violations@1x.png', value: '12', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        },
        {
            incident: 'TVDE23',
            affectedEntity: 'Scott_Edwin,10.82.71.192, 10.82.34.107, 10.82.69.151',
            lastUpdatedOn: '14 Oct 2019 03:50',
            lastUpdatedBy: 'Scott R',
            currentStauts: 'Open',
            outcome: 'Investigation In Progress',
            remediation: 'N/A',
            incidentActivities: [
                { image: 'falg@1x.png', value: '982', title: 'Events' },
                { image: 'resources@1x.png', value: '05', title: 'Resources' },
                { image: 'Shape@1x.png', value: '02', title: 'Locations' },
                { image: 'violations@1x.png', value: '10', title: 'Insights' },
                { image: 'incident@1x.png', value: '0', title: 'Remediations' },
            ]
        }
    ];

    constructor(private routeParam: ActivatedRoute, private router: Router) {
        window.scrollTo(0, 0);
    }

    threatVectorViolations: any;
    dottedThreatVectorViolations: any;
    setThreatVectorViolation() {
        if (this.incidentName == 'TVDE23') {
            this.threatVectorViolations = tvde23SecondData;
            this.dottedThreatVectorViolations = tvde23FirstData;
        }
        else if (this.incidentName == 'TVDE38')
            this.threatVectorViolations = tvde38Data;
        else if (this.incidentName == 'TVDE43')
            this.threatVectorViolations = tvde43Data;
        else if (this.incidentName == 'TVDE21')
            this.threatVectorViolations = tvde21Data;
        else if (this.incidentName == 'TVRC4')
            this.threatVectorViolations = tvrc4Data;
        else if (this.incidentName == 'TVAC92')
            this.threatVectorViolations = tvac92Data;
    }

    incidentDetail: any;
    incidentName: any;

    ngOnInit() {
        if (this.router.url.includes('riskyIncident')) {
            this.routeParam.paramMap.subscribe(params => {
                this.incidentName = params.get('incident');
            });

            this.incidentDetails.forEach(incidentDetail => {
                if (incidentDetail.incident == this.incidentName) {
                    this.incidentDetail = incidentDetail;
                }
            });

            this.setThreatVectorViolation();
        }
    }

    outcomeStyle(outcome: string) {
        if (outcome.includes('True Positive'))
            return { 'color': 'white', 'background-color': 'red' }
        else if (outcome.includes('Investigation In Progress'))
            return { 'color': 'white', 'background-color': 'orange' }
        else
            return { 'color': 'white' };
    }

    seperatorStyle() {
        if (this.incidentName)
            return { 'background-color': 'unset', 'border-right': '3.5px dotted #0891a9' }
    }

    riskyDotStyle() {
        if (this.incidentName)
            return { 'background-color': 'red' }
    }

    routeToIncident(incident) {
        this.router.navigate(['/incidentSummary', incident]);
    }

    gotoSummery() {
        window.open('#/policyViolationSummary', '_blank');
    }

    goToIncident() {
        window.open('#/incidentSummary', '_blank');
    }

    getRiskScoreColor(riskScore: number) {
        if (riskScore <= 65) {
            return 'greenyellow';
        } else if (riskScore > 65 && riskScore <= 79) {
            return 'darkorange';
        } else {
            return 'crimson';
        }
    }

}
