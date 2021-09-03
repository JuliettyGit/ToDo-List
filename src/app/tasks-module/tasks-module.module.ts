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
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from "@angular/router";
import { taskTrackerRoutes } from "../shared/constants/routes/tasksTrackerRoutes";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    TasksComponent,
  ],
  exports: [
    TasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(taskTrackerRoutes),
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
  ]
})
export class TasksModuleModule { }
