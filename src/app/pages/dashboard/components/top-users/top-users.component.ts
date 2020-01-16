import { Component, Input, OnInit } from '@angular/core';
import { TopDetailsService } from '../topDetails/topDetails.service';
import { getRiskScoreColor, User, intToString } from '../../../../shared/utils/util-functions';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-top-users',
    templateUrl: './top-users.component.html',
    styleUrls: ['./top-users.component.scss']
})
export class TopUsersComponent implements OnInit {

    API_KEY: any;
    API_CIPHER: any;

    @Input() user: string;
    topUserDetails: Array<User> = [];
    getRiskScoreColor = getRiskScoreColor;
    intToString = intToString;

    constructor(private topDetailService: TopDetailsService, private router: Router) {
        this.API_KEY = environment.API_KEY;
        this.API_CIPHER = environment.API_CIPHER;
    }

    ngOnInit() {
        this.getTopUsers();
        this.ascendingSorting();
    }

    getTopUsers() {
        this.topDetailService.getTopUsers(this.user).subscribe((res: any) => {
            // res = JSON.parse(CryptoJS.AES.decrypt(res.encryptedData, this.API_KEY, this.API_CIPHER).toString(CryptoJS.enc.Utf8));
            this.topUserDetails = <Array<User>>res;
        });
    }

    ascendingSorting() {
        if (this.topUserDetails)
            this.topUserDetails.sort((a, b) => -(a.riskscorebygrp - b.riskscorebygrp));
    }

    redirect(entityId) {
        if (this.user === 'Orphan')
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
