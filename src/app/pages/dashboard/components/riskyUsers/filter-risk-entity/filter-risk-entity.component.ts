import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { riskyUsers } from '../../../../../core/services/util.data';

@Component({
  selector: 'app-filter-risk-entity',
  templateUrl: './filter-risk-entity.component.html',
  styleUrls: ['./filter-risk-entity.component.scss']
})
export class FilterRiskEntityComponent implements OnInit {

  foundEntityName = '';
  filteredRiskyEntities: any[] = [];

  constructor(private route: ActivatedRoute) {

    this.route.params.subscribe((params: Params) => {
      this.foundEntityName = params['riskyUser'];

      this.filteredRiskyEntities = riskyUsers.filter(riskyUser => riskyUser.user.toLocaleLowerCase() === this.foundEntityName.toLocaleLowerCase());
    });
  }

  ngOnInit() {
  }

}
