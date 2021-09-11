import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { FormsModule } from "@angular/forms";
import { OptionListComponent } from './option-list/option-list.component';
import { DeleteButtonComponent } from "./buttons/delete-button/delete-button.component";
import { EditButtonComponent } from "./buttons/edit-button/edit-button.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { EditModalDialogComponent } from "./modals/edit-modal-dialog/edit-modal-dialog.component";
import { DeleteModalDialogComponent } from "./modals/delete-modal-dialog/delete-modal-dialog.component";
import { AlertModalDialogComponent } from "./modals/alert-modal-dialog/alert-modal-dialog.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { DetailsInfoButtonComponent } from './buttons/details-info-button/details-info-button.component';
import { MatTooltipModule } from "@angular/material/tooltip";
import { DatePickerComponent } from './date-picker/date-picker.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@NgModule({
  declarations: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    EditModalDialogComponent,
    DeleteModalDialogComponent,
    AlertModalDialogComponent,
    DetailsInfoButtonComponent,
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    MatTooltipModule,
    MatDatepickerModule
  ],
  exports: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    DetailsInfoButtonComponent,
    DatePickerComponent
  ]
})
export class SharedModule { }
