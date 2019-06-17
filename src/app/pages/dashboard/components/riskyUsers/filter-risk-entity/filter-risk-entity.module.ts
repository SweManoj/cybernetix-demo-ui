import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../../../../material';
import { FilterRiskEntityComponent } from './filter-risk-entity.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    FilterRiskEntityComponent
  ]
})
export class FilterRiskEntityModule { }
