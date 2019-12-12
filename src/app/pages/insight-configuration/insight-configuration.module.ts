import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InsightConfigurationComponent } from './insight-configuration.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActionInsightConfigurationComponent } from './action-insight-configuration/action-insight-configuration.component';
import { AppRoutingModule } from '../../app.routing.module';
import { InsightConfigurationService } from './insight-configuration.service';

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule, NgbModalModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [InsightConfigurationComponent],
  providers: [InsightConfigurationService]
})
export class InsightConfigurationModule { }
