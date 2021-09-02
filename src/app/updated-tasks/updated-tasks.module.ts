import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UpdatedTasksComponent } from './updated-tasks/updated-tasks.component';
import { appReducer, TODO_REDUCER_NODE } from '../store/reducers/app.reducers';
import { RouterModule } from "@angular/router";
import { toDoListRoutes } from "../shared/constants/routes/toDoListRoutes";
import { ToDoListWidgetComponent } from './widget/toDoList-widget/toDoList-widget.component';
import { ToDoCreateFormUI } from './ui/toDoCreateForm-UI/toDoCreateForm-UI';
import { MatFormFieldModule } from "@angular/material/form-field";
import { SharedModule } from "../shared/shared.module";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { ToDoListUI } from './ui/toDoList-UI/toDoList-UI';
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    UpdatedTasksComponent,
    ToDoListWidgetComponent,
    ToDoCreateFormUI,
    ToDoListUI,
  ],
  exports: [
    UpdatedTasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(toDoListRoutes),
    StoreModule.forFeature(TODO_REDUCER_NODE, appReducer),
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
  ],
})

export class UpdatedTasksModule { }
