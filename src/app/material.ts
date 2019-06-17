import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  imports: [ MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule],
  exports: [ MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule]
})

export class MaterialModule {

}