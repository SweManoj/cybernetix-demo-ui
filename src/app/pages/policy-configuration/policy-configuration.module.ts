import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyConfigurationComponent } from './policy-configuration.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule, NgbModalModule.forRoot()
  ],
  declarations: [PolicyConfigurationComponent]
})
export class PolicyConfigurationModule { }
