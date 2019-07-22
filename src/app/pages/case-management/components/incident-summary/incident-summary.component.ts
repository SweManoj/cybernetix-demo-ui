import { Component, OnInit, ViewChild } from "@angular/core";
import { Comment } from './comment';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";
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
    selector: "app-policy-violation-summary",
    templateUrl: "./incident-summary.component.html"
})
export class IncidentSummaryComponent implements OnInit {
    priority:any = "";
    status:any = "";
    outcome:any = "";
    isUpdate: boolean = false;

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
    commentFormGroup: FormGroup;
    commentValue: AbstractControl;

    constructor(private formBuilder: FormBuilder,private routeParam: ActivatedRoute, private router: Router,private _snackBar: MatSnackBar,private incidentSummaryService: IncidentSummaryService) {
        this.initForm();
    }

    incidentDataChange(){
        if(this.priority != "" || this.status != "" || this.outcome != "" || this.myControl.value.name != null){
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
            this.selectedPolicy = params.get('policyViolationId');
            this.getIncident(this.selectedPolicy);
        });
    }

    displayFn(user?: User): string | undefined {
     return user ? user.name : undefined;
    }

    getIncident(pvId) {
        this.incidentSummaryService.getIncident().subscribe((res: any) => {
      
        });
    }

    private _filter(name: string): User[] {
        const filterValue = name.toLowerCase();

        return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
}
