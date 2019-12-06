import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyConfigurationComponent } from './policy-configuration.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule
  ],
  declarations: [PolicyConfigurationComponent]
})
export class PolicyConfigurationModule { }
