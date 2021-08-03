import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OptionListComponent } from './option-list/option-list.component';

@NgModule({
  declarations: [
    OptionListComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    FormsModule,
  ],
  exports: [
    OptionListComponent
  ]
})
export class SharedModule { }
