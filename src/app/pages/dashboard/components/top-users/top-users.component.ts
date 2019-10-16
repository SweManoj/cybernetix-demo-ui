import { Component, Input, OnInit } from '@angular/core';
import { TopDetailsService } from '../topDetails/topDetails.service';
import { getRiskScoreColor, User, intToString } from '../../../../shared/utils/util-functions';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
    selector: 'app-top-users',
    templateUrl: './top-users.component.html',
    styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {

    @Input() user: string;
    topUserDetails: Array<User> = [];
    getRiskScoreColor = getRiskScoreColor;
    intToString = intToString;

    constructor(private topDetailService: TopDetailsService, private router: Router) {
    }

    ngOnInit() {
        switch (this.user) {
            case 'PRIVILEGED':
                this.getPriviledgeUsers();
                break;
            case 'DORMANT':
                this.getDormantUsers();
                break;
            case 'SERVICE':
                this.getServiceUsers();
                break;
            case 'NEW':
                this.getNewUsers();
                break;
            case 'TERMINATED':
                this.getTerminatedUsers();
                break;
            case 'ORPHAN':
                this.getOrphanUsers();
                break;
            case 'EXTERNAL':
                this.getExternalUsers();
                break;
            case 'OKTA':
                this.getOKTAUsers();
                break;
        }

        this.ascendingSorting();
    }

    ascendingSorting() {
        if (this.topUserDetails)
            this.topUserDetails.sort((a, b) => -(a.riskscorebygrp - b.riskscorebygrp));
    }

    getPriviledgeUsers() {
        this.topDetailService.getTopUsers('Privileged').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getDormantUsers() {
        this.topDetailService.getTopUsers('Dormant').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getServiceUsers() {
        this.topDetailService.getTopUsers('Service').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getNewUsers() {
        this.topDetailService.getTopUsers('newuser').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getTerminatedUsers() {
        this.topDetailService.getTopUsers('Terminated').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getOrphanUsers() {
        this.topDetailService.getTopUsers('Orphan').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getExternalUsers() {
        this.topDetailService.getTopUsers('External').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    getOKTAUsers() {
        this.topDetailService.getTopUsers('okta').subscribe((users: Array<User>) => {
            this.topUserDetails = users;
        });
    }

    redirect(entityId) {
        if (this.user === 'ORPHAN')
            this.fetchOrphanUserEnrichIndexKibanaURL(entityId);
        else
            this.router.navigate(['/riskyUser', entityId])
    }

    fetchOrphanUserEnrichIndexKibanaURL(orphanUserEntityId) {
        this.topDetailService.fetchOrphanUserEnrichIndexKibanaURL(orphanUserEntityId)
            .subscribe((res: any) => {
                window.open(`${environment.kibanaLink}/goto/${res.urlId}`);
            });
    }

}