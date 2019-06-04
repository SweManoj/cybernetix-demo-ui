import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LoginComponent } from './login';
import { LoginService } from './login.service';

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        LoginService
    ]
})
export class LoginModule {}
