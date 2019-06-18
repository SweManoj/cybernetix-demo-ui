import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RiskyEntityViewComponent } from './risky-entity-view';
import { MaterialModule } from './../../../../../../material';

@NgModule({
  declarations: [
    RiskyEntityViewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class RiskyEntityViewModule { }
