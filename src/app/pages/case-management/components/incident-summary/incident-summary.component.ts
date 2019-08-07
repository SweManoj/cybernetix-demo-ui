import {Component, OnInit, ViewChild} from '@angular/core';
import {Comment} from './comment';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

export interface User {
    name: string;
}

@Component({
    selector: 'app-policy-violation-summary',
    templateUrl: './incident-summary.component.html'
})
export class IncidentSummaryComponent implements OnInit {
    priority: any = '';
    status: any = '';
    outcome: any = '';
    isUpdate: boolean = false;
    selectedIncident : any;
    incidentDetails: any;
    myControl = new FormControl();
    options: User[] = [
        {name: 'Maile'},
        {name: 'Stella'},
        {name: 'Tina'},
        {name: 'Coral'},
        {name: 'Shayla Simo'}
    ];
    filteredOptions: Observable<User[]>;

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    d = new Date();

    incidents = [
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_083',
            riskScore: 579,
            ruleInfo: {
                ruleId: 1,
                title: 'Abnormal Failed Logon Attempts on Multiple Machines - Windows'
            },
            incId: 'INC-1'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_061',
            riskScore: 483,
            ruleInfo: {
                ruleId: 2,
                title: 'Successful Logon from Rare Machine - Windows'
            },
            incId: 'INC-2'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '07:10:00',
            accord: false,
            pv: 'PV_039',
            riskScore: 451,
            ruleInfo: {
                ruleId: 3,
                title: 'Unusual Data Exfiltration By Service Account - Proxy'
            },
            incId: 'INC-3'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '09:22:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 398,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious Data Objects Downloaded By Service Account - Fileshare'
            },
            incId: 'INC-4'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '14:45:00',
            accord: false,
            pv: 'PV 069',
            riskScore: 243,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Process Executed - Windows'
            },
            incId: 'INC-5'
        },
        {
            generatedDateFormat: '10 May 2019',
            generatedTimestamp: '17:14:00',
            accord: false,
            pv: 'PV_094',
            riskScore: 149,
            ruleInfo: {
                ruleId: 6,
                title: 'Multiple Users Logged-In Successfully From Same IP'
            },
            incId: 'INC-6'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '06:22:00',
            accord: false,
            pv: 'PV_092',
            riskScore: 19,
            ruleInfo: {
                ruleId: 6,
                title: 'Data Exfiltration to Cloud via HTTPS'
            },
            incId: 'INC-7',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Data Exfiltration'},
                {title: 'Sub Category', value: 'Data Exfiltration'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Berlin'},
                {title: 'Status', value: 'Risk: 97'},
                {title: 'Resources', value: 'DLP'},
                {title: 'Indicators', value: 'URL, Attachment'}],
            description: 'In this Algorithm, User attempted to exfiltrate excessive data to Cloud via HTTPS'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_059',
            riskScore: 118,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Objects Accessed on Fileshare'
            },
            incId: 'INC-8',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Abnormal Pattern'},
                {title: 'Sub Category', value: 'Abnormal Pattern'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Berlin'},
                {title: 'Status', value: 'Risk: 91'},
                {title: 'Resources', value: 'Fileshare'},
                {title: 'Indicators', value: 'FileName'}],
            description: 'In this Algorithm, Multiple Objects Accessed or Downloaded By User on Fileshare in short span'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_041',
            riskScore: 23,
            ruleInfo: {
                ruleId: 4,
                title: 'Suspicious RDP to Multiple Hosts from Privileged User'
            },
            incId: 'INC-9',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Account Compromise'},
                {title: 'Sub Category', value: 'Account Compromise'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Berlin'},
                {title: 'Status', value: 'Risk: 87'},
                {title: 'Resources', value: 'Windows'},
                {title: 'Indicators', value: 'EventID'}],
            description: 'In this Algorithm, Suspicious RDP to Multiple Hosts from Single Host as per historical baselining & Static Peer Grouping'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '02:45:00',
            accord: false,
            pv: 'PV_021',
            riskScore: 17,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal Remote Access Tools Usage'
            },
            incId: 'INC-11',
            threatCategories: [
                {title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Suspicious Behavior'},
                {title: 'Sub Category', value: 'Suspicious Behavior'}
            ],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Berlin'},
                {title: 'Status', value: 'Risk: 84'},
                {title: 'Resources', value: 'Proxy'},
                {title: 'Indicators', value: 'Category'}],
            description: 'In this Algorithm, Suspicious Remote Access Tools Usage By User as per historical baselining & Static Peer Grouping'
        },
        {
            generatedDateFormat: '13 June 2019',
            generatedTimestamp: '01:14:00',
            accord: false,
            pv: 'PV_033',
            riskScore: 2,
            ruleInfo: {
                ruleId: 1,
                title: 'Successful Login From Unusual Location - VPN'
            },
            incId: 'INC-12',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Account Compromise'},
                {title: 'Sub Category', value: 'Account Compromise'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Ukraine'},
                {title: 'Status', value: 'Risk: 75'},
                {title: 'Resources', value: 'VPN'},
                {title: 'Indicators', value: 'Location'}],
            description: 'In this Algorithm, Successful Login Attempts on VPN from Unusual Location'
        },
        {
            generatedDateFormat: '12 June 2019',
            generatedTimestamp: '08:02:00',
            accord: false,
            pv: 'PV_043',
            riskScore: 9,
            ruleInfo: {
                ruleId: 1,
                title: 'Multiple Failed Login Attempts From Unusual Location - VPN'
            },
            incId: 'INC-13',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Account Compromise'},
                {title: 'Sub Category', value: 'Account Compromise'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Ukraine'},
                {title: 'Status', value: 'Risk: 75'},
                {title: 'Resources', value: 'VPN'},
                {title: 'Indicators', value: 'Location'}]
        },
        {
            generatedDateFormat: '12 June 2019',
            generatedTimestamp: '07:30:00',
            accord: false,
            pv: 'PV_088',
            riskScore: 13,
            ruleInfo: {
                ruleId: 2,
                title: 'Abnormal VPN Activities after BadgeIN'
            },
            incId: 'INC-14',
            description: 'In this Algorithm, VPN Activities from User after he/she has physical BadgeIN',
            threatCategories:
                [{title: 'Kill Chain', value: 'Actions/Maintain'},
                    {title: 'Threat Category', value: 'Access Authentication'},
                    {title: 'Sub Category', value: 'Bruce Force Attack'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Berlin, Ukraine'},
                {title: 'Status', value: 'Risk: 74'},
                {title: 'Resources', value: 'Physical, VPN'},
                {title: 'Indicators', value: 'Location'}]

        },
        {
            generatedDateFormat: '11 June 2019',
            generatedTimestamp: '05:20:00',
            accord: false,
            pv: 'PV_073',
            riskScore: 17,
            ruleInfo: {
                ruleId: 1,
                title: 'Multiple Failed Login Attempts From Unusual Location - VPN'
            },
            incId: 'INC-15',
            description: 'In this Algorithm, Multiple Failed Login Attempts on VPN from Unusual Location',
            threatCategories: [{title: 'Kill Chain', value: '-'},
                {title: 'Threat Category', value: 'Account Compromise'},
                {title: 'Sub Category', value: 'Account Compromise'}],
            dummyDatas: [{title: 'Affected Entity', value: 'AWendler'},
                {title: 'Locations', value: 'Ukraine'},
                {title: 'Status', value: 'Risk: 57'},
                {title: 'Resources', value: 'VPN'},
                {title: 'Indicators', value: 'Location'}]
        },
        {
            generatedDateFormat: '10 June 2019',
            generatedTimestamp: '03:22:00',
            accord: false,
            pv: 'PV_023',
            riskScore: 83,
            ruleInfo: {
                ruleId: 1,
                title: 'Outbound Traffic to Spyware URL’s from Privileged User'
            },
            incId: 'INC-16',
            Description: 'In this policy violation, User was trying to access URL(s) with Category: Malicious or Spyware',

            threatCategories: [
                {title: 'Kill Chain', 'value': '-'},
                {title: 'Threat Category', 'value': 'Malicious Behavior'},
                {title: 'SubCategory', 'value': 'Malicious Behavior'}
            ],
            AffectedEntity: 'AWendler',
            Locations: 'Ukraine',
            Risk: 42,
            Resources: 'Proxy',
            Indicators: 'Category'
        },
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '06:47:00',
            accord: false,
            pv: 'PV_014',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Self Escalation Removed Security enabled global group'
            },
            incId : 'INC-17',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description : 'In this Algorithm, User Removed security enabled global group'
        },
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '05:43:00',
            accord: false,
            pv: 'PV_013',
            riskScore: 18,
            ruleInfo: {
                ruleId: 5,
                title: 'Abnormal Data Export on MSQL database'
            },
            incId : 'INC-18',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Data Exfiltration' },
            { title: 'Sub Category', value: 'Data Export' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 81' },
            { title: 'Resources', value: 'MSQL' },
            { title: 'Indicators', value: 'Action/Tables' }],
            description : 'In this Algorithm, user performed abnormal data export on MSQL database'
        },
        {
            generatedDateFormat: '18 July 2019',
            generatedTimestamp: '05:30:00',
            accord: false,
            pv: 'PV_010',
            riskScore: 2,
            ruleInfo: {
                ruleId: 6,
                title: 'Self Escalation Added Security enabled global group'
            },
            incId : 'INC-19',
            threatCategories: [{ title: 'Kill Chain', value: '-' },
            { title: 'Threat Category', value: 'Privileged misuse' },
            { title: 'Sub Category', value: 'Self Privileged Elscalation' }],
            dummyDatas: [{ title: 'Affected Entity', value: 'Maile' },
            { title: 'Locations', value: 'San Diego' },
            { title: 'Status', value: 'Risk: 72/87' },
            { title: 'Resources', value: 'Windows' },
            { title: 'Indicators', value: 'Event Code' }],
            description : 'In this Algorithm, User Added security enabled global group'
        }
    ];
    policyComments: Comment[] = [{
        userId: 'abhishek@123',
        content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,' +
            ' when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        timestamp: this.d.setHours(this.d.getHours() - 2),
        commentId: 1,
        parentId: 0,
        reply: false
    }, {
        userId: 'chetan@123',
        content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
            ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
        timestamp: this.d.setHours(this.d.getHours() - 4),
        commentId: 2,
        parentId: 0,
        reply: false
    },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 3),
            commentId: 3,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 1),
            commentId: 4,
            parentId: 2,
            reply: false
        },
        {
            userId: 'chetan@123',
            content: 'Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown' +
                ' printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.',
            timestamp: this.d.setHours(this.d.getHours() - 5),
            commentId: 5,
            parentId: 2,
            reply: false
        }];

    threatCategories = [
        {
            title: 'Kill Chain',
            value: 'Actions/Maintain'
        },
        {
            title: 'Threat Category',
            value: 'Access Authentication'
        },
        {
            title: 'Sub Category',
            value: 'Bruce Force Attack'
        }
    ];

    killChainProcess = [
        {
            title: 'Initial Recon',
            icon: 'binary-search.png',
            isKill: 0
        },
        {
            title: 'Delivery',
            icon: 'delivery.png',
            isKill: 1
        },
        {
            title: 'Establish Foothold',
            icon: 'foothold.png',
            isKill: 1
        },
        {
            title: 'Initial Recon',
            icon: 'monitor-code.png',
            isKill: 1
        },
        {
            title: 'Move Literally',
            icon: 'connection.png',
            isKill: 0
        },
        {
            title: 'Complete Mission',
            icon: 'document-approval.png',
            isKill: 0
        }
    ];

    commentFormGroup: FormGroup;
    commentValue: AbstractControl;

    constructor(private formBuilder: FormBuilder, private routeParam: ActivatedRoute) {
        this.initForm();
    }

    incidentDataChange() {
        if (this.priority != '' || this.status != '' || this.outcome != '' || this.myControl.value.name != null) {
            this.isUpdate = true;
        }
    }

    initForm() {

        this.commentFormGroup = this.formBuilder.group({
            commentValue: ['', Validators.compose([Validators.required])]
        });

        this.commentValue = this.commentFormGroup.controls['commentValue'];
    }

    submitComment() {
        console.log(this.commentValue.value);
        const comment = new Comment('abhishek@123', this.commentValue.value, new Date(), this.policyComments.length + 1);
        this.policyComments.unshift(comment);
        this.commentValue.setValue('');
    };

    ngOnInit() {
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedIncident = params.get('incID');
            this.incidents.forEach( (incident) => {
                if (incident.incId === this.selectedIncident) {
                    this.incidentDetails = incident;
                }
            });
        });
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => typeof value === 'string' ? value : value.name),
                map(name => name ? this._filter(name) : this.options.slice())
            );
    }

    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
