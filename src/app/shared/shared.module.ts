import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { CrudActionComponent } from './renderers/crud-action/crud-action.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        SharedPipesModule,
        AgGridModule.withComponents([])
    ],
    declarations: [
        CrudActionComponent
    ],
    entryComponents: [CrudActionComponent]
})
export class SharedModule { }
