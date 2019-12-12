import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-action-insight-configuration',
  templateUrl: './action-insight-configuration.component.html',
  styleUrls: ['./action-insight-configuration.component.scss']
})
export class ActionInsightConfigurationComponent implements OnInit {

  addInsightConfig = false;
  editInsightConfig = false;
  viewInsightConfig = false;
  insightConfigId: number;
  pageTitle = 'Add Insight Configurations';

  constructor(private activeRoute: ActivatedRoute, private router: Router,
    private location: Location) {
  }

  ngOnInit() {
    const url = new String(this.router.url);
    if (!url.includes('add')) {
      this.activeRoute.paramMap.subscribe((params: Params) => {
        this.insightConfigId = params.get('insightConfId');
        this.pageTitle = (url.includes('edit') ? 'Edit ' : 'View ') + 'Insight Configurations';
        console.log('page title is : ' + this.pageTitle);
      });
    }
  }

  previousPage() {
    this.location.back();
  }

}
