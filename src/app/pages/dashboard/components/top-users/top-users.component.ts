import {Component, Input, OnInit} from '@angular/core';
import {User} from './user';

@Component({
    selector: 'app-top-users',
    templateUrl: './top-users.component.html',
    styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {

    @Input()
    users: Array<User>;
    title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
