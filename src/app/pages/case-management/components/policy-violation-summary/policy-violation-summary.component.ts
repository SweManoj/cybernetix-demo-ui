import { Component, OnInit, ViewChild } from "@angular/core";
import { Comment } from './comment';
import { PolicyViolationSummaryService } from './policy-violation-summary.service';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { html } from "d3";

export interface User {
    name: string;
}
@Component({
    selector: "app-policy-violation-summary",
    templateUrl: "./policy-violation-summary.component.html"
})
export class PolicyViolationSummaryComponent implements OnInit {
    priority:any = "";
    status:any = "";
    isUpdate: boolean  = false;
    selectedPolicy: any;
    policyDetails = {};
    fileToUpload = [];

    myControl = new FormControl();
    options: User[] = [
      {name: 'Anil Erla', value : 'anil_erla'},
      {name: 'Stella', value : 'stella'},
      {name: 'Tina', value : 'tina'},
      {name: 'Coral', value : 'coral'},
      {name: 'Shayla Simo', value : 'shayla'}
    ];
    filteredOptions: Observable<User[]>;

    @ViewChild('autosize') autosize: CdkTextareaAutosize;

    d = new Date();
    policyComments: Comment[] = [{
        userId: "abhishek@123",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s," +
            " when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        timestamp: this.d.setHours(this.d.getHours() - 2),
        commentId: 1,
        parentId: 0,
        reply: false
    }, {
        userId: "chetan@123",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
            " printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        timestamp: this.d.setHours(this.d.getHours() - 4),
        commentId: 2,
        parentId: 0,
        reply: false
    },
    {
        userId: "chetan@123",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
            " printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        timestamp: this.d.setHours(this.d.getHours() - 3),
        commentId: 3,
        parentId: 2,
        reply: false
    },
    {
        userId: "chetan@123",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
            " printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        timestamp: this.d.setHours(this.d.getHours() - 1),
        commentId: 4,
        parentId: 2,
        reply: false
    },
    {
        userId: "chetan@123",
        content: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown" +
            " printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",
        timestamp: this.d.setHours(this.d.getHours() - 5),
        commentId: 5,
        parentId: 2,
        reply: false
    }];

    threatCategories = [
        {
            title: "Kill Chain",
            value: "Actions/Maintain"
        },
        {
            title: "Threat Category",
            value: "Access Authentication"
        },
        {
            title: "Sub Category",
            value: "Bruce Force Attack"
        }
    ];

    commentFormGroup: FormGroup;
    commentValue: AbstractControl;

    constructor(private formBuilder: FormBuilder, private policyViolationSummaryService: PolicyViolationSummaryService,
                private routeParam: ActivatedRoute, private router: Router,private _snackBar: MatSnackBar) {
        this.initForm();
    }
    
    policyDataChange(){
        if(this.priority != "" || this.status != "" || this.myControl.value != null){
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
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
            );
        this.routeParam.paramMap.subscribe((params) => {
            this.selectedPolicy = params.get('violationId');
            this.getViolatedPolicy(this.selectedPolicy);
        });
    }

    getViolatedPolicy(violationId) {
        this.policyViolationSummaryService.getPolicyDetails(violationId).subscribe((res: any) => {
            this.policyDetails = res;
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

    handleFileInput(files: FileList) {
        this.fileToUpload = files.item(0);
        const policyStringifiedData = JSON.stringify({'pvId' : this.policyDetails.pv_ID});
        this.policyViolationSummaryService.uploadPolicyViolationSummaryAttachment(  this.fileToUpload,policyStringifiedData).subscribe((res: any){
            
            })
    }

    updatePolicy(violationId) {
        const policyData = {
          "priority": this.policyDetails.priority,
          "reviewerUsrName": "anil_erla",
          "status": this.policyDetails.status
        };
        this.policyViolationSummaryService.updatePolicy(policyData, violationId).subscribe((response: any) => {
               
        });
         this._snackBar.open('Updated successfully', null, {
                    duration: 2000,
                });
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
