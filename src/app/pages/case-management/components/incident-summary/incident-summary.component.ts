import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Comment} from './comment';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IncidentSummaryService} from './incident-summary.service';
import {LoginService} from '../../../../core/login/login.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

export interface User {
    name: string;
}

@Component({
    selector: 'app-policy-violation-summary',
    templateUrl: './incident-summary.component.html'
})
export class IncidentSummaryComponent implements OnInit {
    status: any = '';
    isUpdate: boolean = false;
    selectedPolicy: any;
    caseowners = [];
    taggedUsers = [];
    taggedUsersForIncident: any;
    users: any;
    incidentDetailsCopy: any;
    incidentDetails = {
        incidentCreatedTime: '',
        elasticPolicyDescription: '',
        incidentName: '',
        violationTime: '',
        indicatorsCount: '',
        elasticKillChainName: '',
        elasticCategory: '',
        elasticSubCategory: '',
        incId: 0,
        priority: '',
        status: '',
        outcome: '',
        pvID: '',
        attachFiles: [],
        incidentactivities: [],
        incidentComments: [],
        incOwner: {
            firstName: '',
            userName: '',
            lastName: ''
        }
    };
    fileToUpload: any;
    policyComments: any[] = [];
    @ViewChild('autoForTaggedUser') matAutocomplete: MatAutocomplete;
    filteredUsers: Observable<string[]>;
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    myControl = new FormControl();
    taggedUserCtrl = new FormControl();
    @ViewChild('taggedUserInput') taggedUserInput: ElementRef<HTMLInputElement>;
    replyComment: AbstractControl;
    filteredOptions: Observable<User[]>;

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    d = new Date();

    killChainProcess = [
        {
            title: 'Recon',
            icon: 'binary-search.png',
            isKill: 0
        },
        {
            title: 'Weaponization',
            icon: 'foothold.png',
            isKill: 1
        },
        {
            title: 'Delivery',
            icon: 'delivery.png',
            isKill: 1
        },
        {
            title: 'Exploitation',
            icon: 'foothold.png',
            isKill: 1
        },
        {
            title: 'Installation',
            icon: 'monitor-code.png',
            isKill: 1
        },
        {
            title: 'Command and Control',
            icon: 'connection.png',
            isKill: 0
        },
        {
            title: 'Actions on objective',
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

    submitComment(parentId) {
        const comment = new Comment(this.commentValue.value, this.incidentDetails.incId, parentId, []);
        comment.taggedUserIds = []
        this.taggedUsers.forEach((taggedUser) => {
            comment.taggedUserIds.push(taggedUser.userId);
        });
        this.incidentSummaryService.addComment(comment).subscribe((res: any) => {
            this.incidentDetails.incidentComments.unshift(res);
            this.taggedUsers = [];
            this.saveIncidentActivity('added a comment', 'COMMENT_POSTED');
            this.getTaggedUsersForIncident();
        });
        this.commentValue.setValue('');
    }

    initForm() {

        this.commentFormGroup = this.formBuilder.group({
            commentValue: ['', Validators.compose([Validators.required])],
            replyComment: ['', Validators.compose([Validators.required])]
        });
        this.commentValue = this.commentFormGroup.controls['commentValue'];
        this.replyComment = this.commentFormGroup.controls['replyComment'];
    }

    ngOnInit() {
        this.getUsers();
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedPolicy = params.get('policyViolationId');
            this.getIncident(this.selectedPolicy);
        });
    }

    private _taggedUserFilter(value): string[] {
        const filterValue = value.userName.toLowerCase();

        return this.users.filter(user => user.userName.toLowerCase().indexOf(filterValue) === 0);
    }

    getUsers() {
        this.loginService.getUsers().subscribe((users: any) => {
            this.users = users;
            this.filteredUsers = this.taggedUserCtrl.valueChanges.pipe(
                startWith(null),
                map((user: string | null) => user ? this._taggedUserFilter(user) : this.users.slice()));
            users.forEach(user => {
                if (user.userRoleDTOSet.length > 0 && user.userRoleDTOSet[0].roleName === 'ROLE_ADMIN') {
                    this.caseowners.push({name: user.firstName, value: user.userName});
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
            if (res) {
                this.incidentDetails = res;
                this.getTaggedUsersForIncident();
                this.incidentDetailsCopy = Object.assign({}, res);
                if (this.incidentDetails.incOwner) {
                    this.myControl.setValue({
                        name: this.incidentDetails.incOwner.firstName,
                        value: this.incidentDetails.incOwner.userName
                    });
                }
            }
        });
    }

    getTaggedUsersForIncident() {
        this.incidentSummaryService.getTaggedUsersforIncident(this.incidentDetails.incId).subscribe((res: any) => {
           this.taggedUsersForIncident = res;
        });
    }
    assignIncident(incidentId) {
        this.incidentSummaryService.assignIncidentToUser(incidentId).subscribe((response: any) => {
            if (response) {
                response = JSON.parse(response);
                this.incidentDetails.incOwner = response;
                this.incidentDetailsCopy.incOwner = Object.assign({}, this.incidentDetails.incOwner);
                this.myControl.setValue({
                    name: this.incidentDetails.incOwner.firstName,
                    value: this.incidentDetails.incOwner.userName
                });
            }
            this.saveIncidentActivity('assigned this incident to himself', 'ASSIGN_TO_ME');
            this._snackBar.open('Assigned to you successfully', null, {
                duration: 2000,
            });
        });
    }

    submitReply(commentObj, parentId) {
        if (commentObj.childCommentsModel === null) {
            commentObj.childCommentsModel = [];
        }
        const comment = new Comment(this.replyComment.value, this.incidentDetails.incId, parentId,[]);
        this.incidentSummaryService.addComment(comment).subscribe((res: any) => {
            commentObj.childCommentsModel.unshift(res);
            commentObj.reply = false;
        });
        this.replyComment.setValue('');
    }

    uploadIncidentSummaryFile(files: FileList) {
        this.fileToUpload = files.item(0);
        const policyStringifiedData = JSON.stringify({'incidentEntityId': this.incidentDetails.incId});
        this.incidentSummaryService.uploadIncidentSummaryAttachment(this.fileToUpload, policyStringifiedData).subscribe((res: any) => {
            this.incidentDetails.attachFiles.push(res);
            this.saveIncidentActivity('uploaded ' + res.fileName + ' file.', 'FILE_UPLOADED');
            this._snackBar.open('File uploaded successfully', null, {
                duration: 2000,
            });
        });
    }

    add(event: MatChipInputEvent): void {
        if (!this.matAutocomplete.isOpen) {
            const input = event.input;
            const value = event.value;


            if ((value || '').trim()) {
                this.taggedUsers.push(value);
            }

            // Reset the input value
            if (input) {
                input.value = '';
            }

            this.taggedUserCtrl.setValue(null);
        }
    }

    remove(user: string): void {
        const index = this.taggedUsers.indexOf(user);

        if (index >= 0) {
            this.taggedUsers.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.taggedUsers.push(event.option.value);
        this.taggedUserInput.nativeElement.value = '';
        this.taggedUserCtrl.setValue(null);
    }

    updateOutcome() {
        const outcomeData = {
            'incID': this.incidentDetails.incId,
            'outcome': this.incidentDetails.outcome
        };
        this.incidentSummaryService.setIncidentOutcome(outcomeData).subscribe((res: any) => {
            this.saveIncidentActivity('changed the outcome to ' + this.incidentDetails.outcome, 'INCIDENT_OUTCOME');
        });
    }

    updateIncident() {
        if (this.incidentDetails.status === 'CLOSED') {
            this.updateOutcome();
        }
        const incidentData = {
            'priority': this.incidentDetails.priority,
            'incOwnerUsrName': this.myControl.value.value,
            'status': this.incidentDetails.status
        };
        this.incidentSummaryService.updateIncident(incidentData, this.incidentDetails.incId).subscribe((response: any) => {
            this.addFeedsForIncidentUpdate();
            this.getIncident(this.selectedPolicy);
        });
        this._snackBar.open('Updated successfully', null, {
            duration: 2000,
        });
    }

    downloadFile(data) {
        const binaryData = [];
        binaryData.push(data);
        const blob = new Blob(binaryData, {type: 'application/octet-stream'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    addFeedsForIncidentUpdate() {
        if (this.incidentDetails.priority !== this.incidentDetailsCopy.priority) {
            this.saveIncidentActivity('changed the priority to be ' + this.incidentDetails.priority, 'PRIORITY_UPDATED');
        }

        if (this.incidentDetails.status !== this.incidentDetailsCopy.status) {
            this.saveIncidentActivity('changed the status to be ' + this.incidentDetails.status, 'STATUS_UPDATED');
        }

        if (this.incidentDetailsCopy.incOwner !== null) {
            if (this.myControl.value.value !== this.incidentDetailsCopy.incOwner.userName) {
                this.saveIncidentActivity('changed the case owner', 'CASE_OWNER_ASSIGNED');
            }
        } else if (this.myControl.value.value) {
            this.saveIncidentActivity('changed the case owner', 'CASE_OWNER_ASSIGNED');
        }
    }

    getIncidentAttachmentFile(attachementId, fileName) {
        this.saveIncidentActivity('downloaded ' + fileName + ' file.', 'FILE_DOWNLOADED');
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
        };
        this.incidentSummaryService.saveIncidentActivity(activityData).subscribe((res: any) => {
            this.incidentDetails.incidentactivities.unshift(res);
        });
    }

    deleteComment(comment) {
        comment.deleted = true;
        this.incidentSummaryService.deleteComment(comment.incCmtId).subscribe((res: any) => {
            this.saveIncidentActivity('deleted a comment', 'COMMENT_DELETED');
        });
    }
}
