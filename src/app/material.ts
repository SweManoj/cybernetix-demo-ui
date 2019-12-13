import { MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatAutocompleteModule, MatDialogModule],
  exports: [MatButtonModule, MatCheckboxModule, MatGridListModule, MatCardModule, MatIconModule, MatFormFieldModule, MatInputModule, MatMenuModule, MatSelectModule, MatAutocompleteModule, MatDialogModule]
})

export class MaterialModule {
}
