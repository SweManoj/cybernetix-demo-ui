import { Component, OnInit } from '@angular/core';
import { environment } from "../../../environments/environment";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
	kibanaUrl : string;

    constructor() {
    }

    ngOnInit() {
    	this.kibanaUrl = environment.kibanaLink;
    }

}