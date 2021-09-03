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
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    EditModalDialogComponent,
    DeleteModalDialogComponent,
    AlertModalDialogComponent,
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
    DragDropModule

  ],
  exports: [
    OptionListComponent,
    DeleteButtonComponent,
    EditButtonComponent
  ]
})
export class SharedModule { }
