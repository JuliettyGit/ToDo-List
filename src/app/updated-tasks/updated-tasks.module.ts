import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { UpdatedTasksComponent } from './updated-tasks/updated-tasks.component';
import { appReducer, TODO_REDUCER_NODE } from '../store/reducers/app.reducers';
import {RouterModule} from "@angular/router";
import {toDoListRoutes} from "../shared/constants/routes/toDoListRoutes";

@NgModule({
  declarations: [
    UpdatedTasksComponent,
  ],
  exports: [
    UpdatedTasksComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(toDoListRoutes),

    StoreModule.forFeature(TODO_REDUCER_NODE, appReducer),
  ],
})

export class UpdatedTasksModule { }
