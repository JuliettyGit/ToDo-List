import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksComponent } from './tasks/tasks.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    TasksComponent
  ],
  exports: [
    TasksComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatIconModule
  ]
})
export class TasksModuleModule { }
