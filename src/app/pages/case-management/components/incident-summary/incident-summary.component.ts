import { Component, OnInit, ViewChild } from '@angular/core';
import { Comment } from './comment';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncidentSummaryService } from './incident-summary.service';
import {LoginService} from '../../../../core/login/login.service';

export interface User {
    name: string;
}

@Component({
    selector: 'app-policy-violation-summary',
    templateUrl: './incident-summary.component.html'
})
export class IncidentSummaryComponent implements OnInit {
    status: any = '';
    outcome: any = '';
    isUpdate: boolean = false;
    selectedPolicy: any;
    caseowners = [];
    incidentDetails: any = {
        incId: 0,
        priority: '',
        status: '',
        outcome: '',
        attachFiles: [],
        owner: {
            firstName: '',
            userName: ''
        }
    };
    fileToUpload: any;
    policyComments: any[] = [];

    myControl = new FormControl();
    filteredOptions: Observable<User[]>;

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    d = new Date();

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

    constructor(private formBuilder: FormBuilder, private routeParam: ActivatedRoute,
                private router: Router, private _snackBar: MatSnackBar, private incidentSummaryService: IncidentSummaryService,
                private loginService: LoginService) {
        this.initForm();
    }

    incidentDataChange() {
        if (this.incidentDetails.priority !== '' || this.incidentDetails.status !== '' || this.incidentDetails.outcome !== ''
            || this.myControl.value.name != null) {
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
    }

    ngOnInit() {
        this.getUsers();
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedPolicy = params.get('policyViolationId');
            this.getIncident(this.selectedPolicy);
        });
    }

    getUsers() {
        this.loginService.getUsers().subscribe((users: any) => {
            users.forEach(user => {
                if (user.userRoleDTOSet.length > 0 && user.userRoleDTOSet[0].roleName === 'ROLE_ADMIN') {
                    this.caseowners.push({ name: user.firstName, value: user.userName});
                }
            });
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value.name),
                    map(name => name ? this._filter(name) : this.caseowners.slice())
                );
        });
    }


    displayFn(user?: User): string | undefined {
        return user ? user.name : undefined;
    }

    getIncident(pvId) {
        this.incidentSummaryService.getIncidentDetials(pvId).subscribe((res: any) => {
                this.incidentDetails = res;
            if (this.incidentDetails.owner) {
                this.myControl.setValue({ name: this.incidentDetails.owner.firstName, value: this.incidentDetails.owner.userName});
            }
        });
    }

    assignIncident(incidentId) {
        this.incidentSummaryService.assignIncidentToUser(incidentId).subscribe((response: any) => {
            this.saveIncidentActivity('assigned this incident to himself', 'ASSIGN_TO_ME');
            this._snackBar.open(response, null, {
                duration: 2000,
            });
        });
    }

    uploadIncidentSummaryFile(files: FileList) {
        this.fileToUpload = files.item(0);
        const policyStringifiedData = JSON.stringify({'incidentEntityId' : this.incidentDetails.incId});
        this.incidentSummaryService.uploadIncidentSummaryAttachment(this.fileToUpload, policyStringifiedData).subscribe((res: any) => {
            this.incidentDetails.attachFiles.push(JSON.parse(res));
            this._snackBar.open('File uploaded successfully', null, {
                duration: 2000,
            });
        });
    }

    updateIncident() {
        const policyData = {
            'priority': this.incidentDetails.priority,
            'incOwnerUsrName': this.myControl.value.value,
            'status': this.incidentDetails.status,
            'outcome': this.incidentDetails.outcome
        };
        this.incidentSummaryService.updateIncident(policyData, this.incidentDetails.incId).subscribe((response: any) => {});
        this._snackBar.open('Updated successfully', null, {
            duration: 2000,
        });
    }

    downloadFile(data) {
        const binaryData = [];
        binaryData.push(data);
        const blob = new Blob(binaryData, { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    getIncidentAttachmentFile(attachementId) {
        this.incidentSummaryService.downloadIncidentSummaryAttachment(attachementId)
            .subscribe(data => this.downloadFile(data)),
            error => console.log('Error downloading the file.'),
            () => console.log('Completed file download.');
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.caseowners.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    saveIncidentActivity(feed, action) {
        const activityData = {
            'feed': feed,
            'actionType': action,
            'incID': this.incidentDetails.incId
        }
        this.incidentSummaryService.saveIncidentActivity(activityData).subscribe((res: any) =>{
            console.log(res);
        });
    }
}
