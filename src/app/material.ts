import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule],
  exports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule]
})

export class MaterialModule {

}