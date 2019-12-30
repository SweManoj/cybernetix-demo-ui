import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleActionComponent } from './role/role-action/role-action.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserActionComponent } from './user/user-action/user-action.component';
import { RbackConfigurationService } from './rback-configuration.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonToggleModule } from '@angular/material';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule, AgGridModule.withComponents([]), FormsModule, ReactiveFormsModule, NgbModalModule.forRoot(),
    BrowserAnimationsModule, MatButtonToggleModule, NgbModule
  ],
  declarations: [RoleListComponent, RoleActionComponent, UserListComponent, UserActionComponent],
  providers: [RbackConfigurationService]
})
export class RbackConfigurationModule { }
