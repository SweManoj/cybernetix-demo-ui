import { Component, OnInit, ViewChild } from "@angular/core";
import { Comment } from './comment';
import { FormGroup, AbstractControl, FormBuilder, Validators } from "@angular/forms";
import { CdkTextareaAutosize } from "@angular/cdk/text-field";

@Component({
    selector: "app-policy-violation-summary",
    templateUrl: "./policy-violation-summary.component.html"
})
export class PolicyViolationSummaryComponent implements OnInit {

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

    constructor(private formBuilder: FormBuilder) {
        this.initForm();
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
    }
}
