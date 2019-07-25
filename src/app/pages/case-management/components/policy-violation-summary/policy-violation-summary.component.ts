import { Component, OnInit, ViewChild } from '@angular/core';
import { Comment } from './comment';
import { PolicyViolationSummaryService } from './policy-violation-summary.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {LoginService} from '../../../../core/login/login.service';

export interface User {
    name: string;
    value: string;
}
@Component({
    selector: 'app-policy-violation-summary',
    templateUrl: './policy-violation-summary.component.html'
})
export class PolicyViolationSummaryComponent implements OnInit {
    priority: any = '';
    status: any = '';
    isUpdate: boolean  = false;
    selectedPolicy: any;
    policyDetailsCopy = {
        pv_ID : 0,
        attachedFiles : [],
        priority: '',
        status: '',
        policyCommentsEntities : [],
        reviewer : {userName : '', firstName: '', lastName: ''}
    };
    policyDetails = {
        pv_ID : 0,
        attachedFiles : [],
        priority: '',
        status: '',
        policyCommentsEntities : [],
        policyViolationActivities: [],
        reviewer : {userName : '', firstName: '', lastName: ''}
    };
    fileToUpload = {};

    myControl = new FormControl();
    reviewers: User[] = [];
    filteredOptions: Observable<User[]>;
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    d = new Date();
    policyComments: Comment[] = [];

    commentFormGroup: FormGroup;
    commentValue: AbstractControl;
    replyComment: AbstractControl;

    constructor(private formBuilder: FormBuilder, private policyViolationSummaryService: PolicyViolationSummaryService,
                private routeParam: ActivatedRoute, private router: Router,
                private _snackBar: MatSnackBar, private loginService: LoginService) {
        this.initForm();
    }
   policyDataChange() {
        if (this.policyDetails.priority !== '' || this.policyDetails.status !== '' || this.myControl.value !== null) {
            this.isUpdate = true;
        }
    }

    initForm() {
        this.commentFormGroup = this.formBuilder.group({
            commentValue: ['', Validators.compose([Validators.required])]
        });

        this.commentValue = this.commentFormGroup.controls['commentValue'];
    }

    submitComment(parentId) {
        const comment = new Comment(this.commentValue.value, this.policyDetails.pv_ID, parentId);
        this.policyViolationSummaryService.addComment(comment).subscribe((res: any) => {
            this.policyDetails.policyCommentsEntities.unshift(JSON.parse(res));
            this.savePolicyViolationActivity('added a comment', 'COMMENT_POSTED');
        });
        this.commentValue.setValue('');
    }

    submitReply(parentId) {
        const comment = new Comment(this.replyComment.value, this.policyDetails.pv_ID, parentId);
        this.policyViolationSummaryService.addComment(comment).subscribe((res: any) => {
            const y = res;
        });
        this.replyComment.setValue('');
    }

    ngOnInit() {
        this.getUsers();
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedPolicy = params.get('violationId');
            this.getViolatedPolicy(this.selectedPolicy);
        });
    }

    getUsers() {
        this.loginService.getUsers().subscribe((users: any) => {
            users.forEach(user => {
                if (user.userRoleDTOSet.length > 0 && user.userRoleDTOSet[0].roleName === 'ROLE_ADMIN') {
                    this.reviewers.push({ name: user.firstName + ' ' + user.lastName, value: user.userName});
                }
            });
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value.name),
                    map(name => name ? this._filter(name) : this.reviewers.slice())
                );
        });
    }

    getViolatedPolicy(violationId) {
        this.policyViolationSummaryService.getPolicyDetails(violationId).subscribe((res: any) => {
            this.policyDetails = res;
            this.policyDetailsCopy = Object.assign({}, res);
            if (this.policyDetails.reviewer) {
                this.myControl.setValue({ name: this.policyDetails.reviewer.firstName + ' ' +
                        + this.policyDetails.reviewer.lastName, value: this.policyDetails.reviewer.userName});
            }
        });
    }

    assignPolicy(violationId) {
        this.policyViolationSummaryService.assignPolicyToUser(violationId).subscribe((response: any) => {
                this.savePolicyViolationActivity('assigned this policy to himself', 'ASSIGN_TO_ME');
                this._snackBar.open('Assigned to you successfully', null, {
                    duration: 2000,
                });
        });
    }

    displayFn(user?: User): string | undefined {
     return user ? user.name : undefined;
    }

    uploadPolicyViolationFile(files: FileList) {
        this.fileToUpload = files.item(0);
        const policyStringifiedData = JSON.stringify({'pvId' : this.policyDetails.pv_ID});
        this.policyViolationSummaryService.uploadPolicyViolationSummaryAttachment(this.fileToUpload, policyStringifiedData)
            .subscribe((res: any) => {
                const fileData = JSON.parse(res);
                this.policyDetails.attachedFiles.push(fileData);
                this.savePolicyViolationActivity('uploaded ' + fileData.fileName + ' file.', 'FILE_UPLOADED');
                this._snackBar.open('File uploaded successfully', null, {
                    duration: 2000,
                });
        });
    }

    downloadFile(data) {
        const binaryData = [];
        binaryData.push(data);
        const blob = new Blob(binaryData, { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
    }

    getPolicyAttachmentFile(attachementId, fileName) {
        this.savePolicyViolationActivity('downloaded ' + fileName + ' file.', 'FILE_DOWNLOADED');
        this.policyViolationSummaryService.downloadPolicyViolationSummaryAttachment(attachementId)
                .subscribe(data => this.downloadFile(data)), //console.log(data),
                error => console.log('Error downloading the file.'),
                () => console.log('Completed file download.');
    }

    updatePolicy(violationId) {
        const policyData = {
          'priority': this.policyDetails.priority,
          'reviewerUsrName': this.myControl.value.value,
          'status': this.policyDetails.status
        };
        this.policyViolationSummaryService.updatePolicy(policyData, violationId).subscribe((response: any) => {
            this.addFeedsForPolicyUpdate();
        });
         this._snackBar.open('Updated successfully', null, {
                    duration: 2000,
                });
    }

    addFeedsForPolicyUpdate() {
        if (this.policyDetails.priority !== this.policyDetailsCopy.priority) {
            this.savePolicyViolationActivity('changed the priority to be ' + this.policyDetails.priority , 'PRIORITY_UPDATED');
        }

        if (this.policyDetails.status !== this.policyDetailsCopy.status) {
            this.savePolicyViolationActivity('changed the status to be ' + this.policyDetails.status , 'STATUS_UPDATED');
        }

        if (this.policyDetailsCopy.reviewer !== null) {
            if (this.myControl.value.value !== this.policyDetailsCopy.reviewer.userName) {
                this.savePolicyViolationActivity('changed the reviewer', 'REVIEWER_ASSIGNED');
            }
        } else if (this.myControl.value.value) {
                this.savePolicyViolationActivity('changed the reviewer' , 'REVIEWER_ASSIGNED');
        }
    }

    deleteComment(comment) {
       comment.deleted = true;
       this.policyViolationSummaryService.deleteComment(comment.cmtId).subscribe((res: any) => {
           this.savePolicyViolationActivity('deleted a comment', 'COMMENT_DELETED');
       });
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.reviewers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }

    savePolicyViolationActivity(feed, action) {
        const activityData = {
            'feed': feed,
            'actionType': action,
            'pvID': this.policyDetails.pv_ID
        }
        this.policyViolationSummaryService.savePolicyViolationActivity(activityData).subscribe((res: any) => {
            this.policyDetails.policyViolationActivities.unshift(res);
        });
    }
}
