import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionInsightConfigurationComponent } from './action-insight-configuration/action-insight-configuration.component';
import { InsightConfigurationListComponent } from './insight-configuration-list/insight-configuration-list.component';
import { CardModule } from 'primeng/card';
import { MaterialModule } from '../../material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule, NgbModalModule.forRoot()
  ],
  declarations: [InsightConfigurationListComponent, ActionInsightConfigurationComponent],
  providers: []
})
export class InsightConfigurationModule { }
