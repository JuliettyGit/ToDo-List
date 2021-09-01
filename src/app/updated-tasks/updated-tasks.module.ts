import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromList from 'src/app/store/reducers/reducers';
import { UpdatedTasksComponent } from './updated-tasks/updated-tasks.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { SharedModule } from "../shared/shared.module";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { DeleteModalDialogComponent } from "../tasks-module/delete-modal-dialog/delete-modal-dialog.component";
import { AlertModalDialogComponent } from "../tasks-module/alert-modal-dialog/alert-modal-dialog.component";
import { EditModalDialogComponent } from "../tasks-module/edit-modal-dialog/edit-modal-dialog.component";
import { EditButtonComponent } from "../tasks-module/edit-button/edit-button.component";
import { DeleteButtonComponent } from "../tasks-module/delete-button/delete-button.component";

@NgModule({
  declarations: [
    UpdatedTasksComponent,
    EditModalDialogComponent,
    DeleteModalDialogComponent,
    AlertModalDialogComponent,
    EditButtonComponent,
    DeleteButtonComponent,
  ],
  exports: [
    UpdatedTasksComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    SharedModule,
    DragDropModule,
    StoreModule.forRoot(fromList.taskListReducer),
  ],
})

export class UpdatedTasksModule { }