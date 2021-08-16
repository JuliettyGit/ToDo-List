import {Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent} from '../delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../alert-modal-dialog/alert-modal-dialog.component';
import { Task } from './task';
import { filter } from 'rxjs/operators';
import { taskStatuses } from 'src/app/shared/constants/taskStatuses'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

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
  toDoList: Array<Task> = [];
  notStartedTasks: Array<Task> = [];
  inProgressTasks: Array<Task> = [];
  finishedTasks: Array<Task> = [];

  constructor(public dialog: MatDialog)
{

}

  ngOnInit(): void {
  }

  writeStatus(event: string)
  {
    this.status = event;
  }


  addTask(){
    if(!this.status)
    {
      this.status = taskStatuses[0].status
    }

    let newTask: { taskText: string;  taskStatus: string } =
      {
      taskText: this.taskInput.trim(),
      taskStatus: this.status,
      }

    if(newTask.taskText === '')
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if(!this.taskItems.find((item)=> newTask.taskText === item.taskText))
    {
      switch (newTask.taskStatus){
        case taskStatuses[0].status:
        {
          this.toDoList.push(<Task>newTask);
          break;
        }

        case taskStatuses[1].status:
        {
          this.notStartedTasks.push(<Task>newTask);
          break;
        }

        case taskStatuses[2].status:
        {
          this.inProgressTasks.push(<Task>newTask);
          break;
        }

        case taskStatuses[3].status:
        {
          this.finishedTasks.push(<Task>newTask);
          break;
        }

        default:
        {
          this.taskItems.push(<Task>newTask);
          break
        }
      }

      this.taskInput = '';
    }

    else {
      const alertText = "This task has already created";
      this.openAlertDialog(alertText);
    }
    this.status = taskStatuses[0].status

    return this.taskItems;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container)
    {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }

    else
    {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
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
