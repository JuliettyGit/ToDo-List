import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OptionListComponent } from './option-list/option-list.component';
import { DeleteButtonComponent } from "./delete-button/delete-button.component";
import {EditButtonComponent} from "./edit-button/edit-button.component";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent
  ]
})
export class SharedModule { }
