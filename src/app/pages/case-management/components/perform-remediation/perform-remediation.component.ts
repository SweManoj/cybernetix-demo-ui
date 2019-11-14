import { Component, OnInit } from '@angular/core';
import { PerformRemediationService } from '../../../../core/services/perform-remediation.service';

@Component({
  selector: 'app-perform-remediation',
  templateUrl: './perform-remediation.component.html',
  styleUrls: ['./perform-remediation.component.scss']
})
export class PerformRemediationComponent implements OnInit {

  performRemediationTitle: string;
  constructor(private performRemediationService: PerformRemediationService) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.performRemediationTitle = this.performRemediationService.performRemediationTitle;
  }

}
