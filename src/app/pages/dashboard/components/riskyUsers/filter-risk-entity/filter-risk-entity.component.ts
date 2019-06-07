import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UtilDataService } from '../../../../../core/services/util.data.service';

@Component({
  selector: 'app-filter-risk-entity',
  templateUrl: './filter-risk-entity.component.html',
  styleUrls: ['./filter-risk-entity.component.scss']
})
export class FilterRiskEntityComponent implements OnInit {

  foundEntityName = '';
  filteredRiskyEntities: any[] = [];

  constructor(private route: ActivatedRoute, private utilDataService: UtilDataService) {

    this.route.params.subscribe((params: Params) => {
      this.foundEntityName = params['riskyUser'];

      this.filteredRiskyEntities = this.utilDataService.getFilteredRiskyUsers();
    });
  }

  ngOnInit() {
  }

}
