import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseManagementComponent } from './case-management.component';
import { AppRoutingModule } from '../../app.routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox'
import { CaseManagementService } from './case-management.service';
import { CaseModalComponent } from './components/case-modal/case-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertsComponent } from './components/alerts/alerts.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PolicyViolationDetailViewComponent } from './components/policy-violation-detail-view/policy-violation-detail-view.component';
import { PolicyViolationSummaryComponent } from './components/policy-violation-summary/policy-violation-summary.component';
import { PulseGlobeComponent } from './components/pulse-globe/pulse-globe.component';
import { TestEsComponent } from './components/test-es/test-es.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from 'time-ago-pipe';

import { MaterialModule } from './../../material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslateModule,
    NgbModule,
    TableModule,
    DropdownModule,
    CheckboxModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    CaseManagementComponent,
    CaseModalComponent,
    AlertsComponent,
    PolicyViolationDetailViewComponent,
    PolicyViolationSummaryComponent,
    PulseGlobeComponent,
    TimeAgoPipe,
    TestEsComponent
  ],
  entryComponents: [
    CaseModalComponent
  ],
  providers: [
    CaseManagementService
  ]
})
export class CaseManagementModule { }
