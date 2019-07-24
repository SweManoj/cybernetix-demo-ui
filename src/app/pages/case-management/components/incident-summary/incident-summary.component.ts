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
    selectedPolicy: any;
    incidentDetails: any;
    fileToUpload: any;
    policyComments: any[] = [];

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
                private router: Router, private _snackBar: MatSnackBar, private incidentSummaryService: IncidentSummaryService) {
        this.initForm();
    }

    incidentDataChange() {
        if (this.priority !== '' || this.status !== '' || this.outcome !== '' || this.myControl.value.name != null) {
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
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
            );

        this.routeParam.paramMap.subscribe((params) => {
            this.selectedPolicy = params.get('policyViolationId');
            this.getIncident(this.selectedPolicy);
        });
    }

    displayFn(user?: User): string | undefined {
     return user ? user.name : undefined;
    }

    getIncident(pvId) {
        this.incidentSummaryService.getIncidentDetials(pvId).subscribe((res: any) => {
                this.incidentDetails = res;
        });
    }

    assignIncident(incidentId) {
        this.incidentSummaryService.assignIncidentToUser(incidentId).subscribe((response: any) => {
            this._snackBar.open(response, null, {
                duration: 2000,
            });
        });
    }

    uploadIncidentSummaryFile(files: FileList) {
        this.fileToUpload = files.item(0);
        const policyStringifiedData = JSON.stringify({'pvId' : this.incidentDetails.pvID});
        this.incidentSummaryService.uploadIncidentSummaryAttachment(this.fileToUpload, policyStringifiedData).subscribe((res: any) => {
            this.incidentDetails.attachFiles.push(res);
            this._snackBar.open('File uploaded successfully', null, {
                duration: 2000,
            });
        });
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
