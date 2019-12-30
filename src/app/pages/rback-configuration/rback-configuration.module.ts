import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleActionComponent } from './role/role-action/role-action.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserActionComponent } from './user/user-action/user-action.component';
import { RbackConfigurationService } from './rback-configuration.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoleListComponent, RoleActionComponent, UserListComponent, UserActionComponent],
  providers: [RbackConfigurationService]
})
export class RbackConfigurationModule { }
