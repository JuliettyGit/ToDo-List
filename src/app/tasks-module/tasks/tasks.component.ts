import {Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent} from '../delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../alert-modal-dialog/alert-modal-dialog.component';
import { Task } from './task';
import { filter } from 'rxjs/operators';
import { taskStatuses } from 'src/app/shared/constants/taskStatuses'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})

export class TasksComponent implements OnInit {

  @Input() setStatus: void;

  taskItems: Array<Task> = [];
  taskInput: string = '';
  status: string = '';
  sClass: string = '';


  constructor(public dialog: MatDialog)
{

}

  ngOnInit(): void {
  }

  writeStatus(event: string)
  {
    this.status = event;
    this.sClass = event;
  }


  addTask(){
    if(!this.status){
      this.status = taskStatuses[0].status
    }

    let newTask: { taskText: string;  taskStatus: string; statusClass: string} = {
      taskText: this.taskInput.trim(),
      taskStatus: this.status,
      statusClass: this.sClass
    }

    if(newTask.taskText === '')
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if(!this.taskItems.find((item)=> newTask.taskText === item.taskText))
    {
      this.taskItems.push(<Task>newTask);
      this.taskInput = '';
      console.log(this.taskItems)
    }

    else {
      const alertText = "This task has already created";
      this.openAlertDialog(alertText);
    }
    this.status = taskStatuses[0].status

    return this.taskItems;
  }

  editTask(i: number, result: Task){
    this.taskItems.splice(i, 1, result)

  }

  deleteTask(i: number)
  {
    this.taskItems.splice(i, 1);
  }

  openEditDialog(i: number) {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {taskText: this.taskItems[i].taskText,
        taskStatus: this.taskItems[i].taskStatus}
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!this.taskItems[i] && res))
      .subscribe(result => {
        this.editTask(i, result);
    });
  }

  openDeleteDialog(i: number) {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      data: {taskText: this.taskItems[i].taskText}
    });

    dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
      });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(() => this.deleteTask(i));
  }

  openAlertDialog(alertText: string){
    this.dialog.open(AlertModalDialogComponent, {
      data: { alertText: alertText }
    });
  }

}
