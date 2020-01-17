import { Component, OnInit, Inject } from '@angular/core';
import { environment } from "../../../environments/environment";
import { SESSION_STORAGE, StorageService } from 'angular-webstorage-service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

    userPermissions = [];
    kibanaUrl: string;

    constructor(@Inject(SESSION_STORAGE) public sessionStorage: StorageService) {
        this.userPermissions = JSON.parse(this.sessionStorage.get('userPermissions'));
    }

    ngOnInit() {
        this.kibanaUrl = environment.kibanaLink;
    }

}