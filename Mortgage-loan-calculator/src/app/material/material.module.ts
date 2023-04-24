import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {  MatCardModule} from '@angular/material/card'
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import {MatSliderModule} from '@angular/material/slider';
import { MatTabGroup } from '@angular/material/tabs';

const MaterialComponents=[
MatButtonModule,
MatDividerModule,
MatSlideToggleModule,
MatSelectModule,
MatPaginatorModule,
MatTableModule,
MatTooltipModule,
MatToolbarModule,
MatIconModule,
MatInputModule,
MatFormFieldModule,
MatCardModule,
MatAutocompleteModule,
MatSliderModule,
];

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports:[MaterialComponents],
})
export class MaterialModule { }
