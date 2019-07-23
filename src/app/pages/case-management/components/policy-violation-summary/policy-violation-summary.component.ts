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
    policyDetails = {
        pv_ID : 0,
        attachedFiles : [],
        priority: '',
        status: '',
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
        console.log(this.commentValue.value);
        const comment = new Comment(this.commentValue.value, this.policyDetails.pv_ID, parentId);
        this.policyViolationSummaryService.addComment(comment).subscribe((res: any) => {
            const y = res;
        });
        this.commentValue.setValue('');
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
            if (this.policyDetails.reviewer) {
                this.myControl.setValue({ name: this.policyDetails.reviewer.firstName + ' ' +
                        + this.policyDetails.reviewer.lastName, value: this.policyDetails.reviewer.userName});
            }
        });
    }

    assignPolicy(violationId) {
        this.policyViolationSummaryService.assignPolicyToUser(violationId).subscribe((response: any) => {
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
                this.policyDetails.attachedFiles.push(res.policyViolationSummaryAttachmentName);
                this._snackBar.open('File uploaded successfully', null, {
                    duration: 2000,
                });
        });
    }

    updatePolicy(violationId) {
        const policyData = {
          'priority': this.policyDetails.priority,
          'reviewerUsrName': this.myControl.value.value,
          'status': this.policyDetails.status
        };
        this.policyViolationSummaryService.updatePolicy(policyData, violationId).subscribe((response: any) => {});
         this._snackBar.open('Updated successfully', null, {
                    duration: 2000,
                });
    }

    deleteComment(comment) {
       this.policyViolationSummaryService.deleteComment(comment.cmtId).subscribe((res: any) => {});
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.reviewers.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
