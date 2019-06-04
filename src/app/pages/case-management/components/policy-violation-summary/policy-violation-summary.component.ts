import { Component, OnInit } from "@angular/core";
import { Comment } from './comment';

@Component({
    selector: "app-policy-violation-summary",
    templateUrl: "./policy-violation-summary.component.html"
})
export class PolicyViolationSummaryComponent implements OnInit {
    comment;
    d = new Date();
    policyComments = [{
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
        timestamp: this.d.setHours(this.d.getHours() - 4),
        commentId: 3,
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

    submitted = false;

    submitComment() {
        console.log(this.comment);
        this.submitted = true;
        this.policyComments.unshift(this.comment);
        this.comment = new Comment('abhishek@123', '', new Date());
    };

    ngOnInit() {
        this.comment = new Comment('abhishek@123', '', new Date());
    }
}
