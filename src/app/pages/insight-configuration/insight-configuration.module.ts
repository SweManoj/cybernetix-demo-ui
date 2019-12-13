import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { InsightConfigurationComponent } from './insight-configuration.component';
import { BrowserModule } from '@angular/platform-browser';
import { ActionInsightConfigurationComponent } from './action-insight-configuration/action-insight-configuration.component';
import { InsightConfigurationRoutingModule } from './insight-configuration-routing.module';
import { InsightConfigurationListComponent } from './insight-configuration-list/insight-configuration-list.component';
import { MenuLayoutComponent } from '../../core/layout/menu.layout.component';

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule, NgbModalModule.forRoot(),
    // InsightConfigurationRoutingModule
  ],
  declarations: [InsightConfigurationComponent, InsightConfigurationListComponent, ActionInsightConfigurationComponent],
  providers: []
})
export class InsightConfigurationModule { }
