import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EditModalDialogComponent} from './edit-modal-dialog/edit-modal-dialog.component';
import { DeleteModalDialogComponent } from './delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from './alert-modal-dialog/alert-modal-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { EditButtonComponent } from './edit-button/edit-button.component';
import { DeleteButtonComponent } from './delete-button/delete-button.component';

@NgModule({
  declarations: [
    TasksComponent,
    EditModalDialogComponent,
    DeleteModalDialogComponent,
    AlertModalDialogComponent,
    EditButtonComponent,
    DeleteButtonComponent,
  ],
  exports: [
    TasksComponent,
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
    DragDropModule
  ]
})
export class TasksModuleModule { }
