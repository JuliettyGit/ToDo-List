import { Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent } from '../delete-modal-dialog/delete-modal-dialog.component';
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

  taskInput: string = '';
  status: string = '';

  tasksObj = {
    toDos: new Array<Task>(),
    inProgress: new Array<Task>(),
    finished: new Array<Task>(),
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  writeStatus(event: string)
  {
    this.status = event;
  }

  addTask()
  {
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

    else
    {
      if((this.tasksObj.toDos.some(task => task.taskText === newTask.taskText))
        ||(this.tasksObj.inProgress.some(task => task.taskText === newTask.taskText))
        ||(this.tasksObj.finished.some(task => task.taskText === newTask.taskText)))
      {
        const alertText = "This task has already created";
        this.openAlertDialog(alertText);
      }

      if(newTask.taskStatus === taskStatuses[0].status
        && !(this.tasksObj.toDos.some(e => e.taskText === newTask.taskText))
        && !(this.tasksObj.inProgress.some(e => e.taskText === newTask.taskText))
        && !(this.tasksObj.finished.some(e => e.taskText === newTask.taskText)))
      {
        this.tasksObj.toDos.push(newTask);
        console.log(this.tasksObj.toDos)
      }

      if(newTask.taskStatus === taskStatuses[1].status
        && !(this.tasksObj.toDos.some(task => task.taskText === newTask.taskText))
        && !(this.tasksObj.inProgress.some(task => task.taskText === newTask.taskText))
        && !(this.tasksObj.finished.some(task => task.taskText === newTask.taskText))
      )
      {
        this.tasksObj.inProgress.push(newTask);
        console.log(this.tasksObj.inProgress)
      }
      if(newTask.taskStatus === taskStatuses[2].status
        && !(this.tasksObj.toDos.some(task => task.taskText === newTask.taskText))
        && !(this.tasksObj.inProgress.some(task => task.taskText === newTask.taskText))
        && !(this.tasksObj.finished.some(task => task.taskText === newTask.taskText)))
      {
        this.tasksObj.finished.push(newTask);
        console.log(this.tasksObj.finished)
      }

      this.taskInput = '';
    }

    return this.tasksObj;
  }

  whatsTask(i: any)
  {
    let task: Task;
    if(this.tasksObj.toDos.includes(i))
    {
      task = i;
      this.openEditDialog(task)
    }
    if(this.tasksObj.inProgress.includes(i))
    {
      task = i;
      this.openEditDialog(task)
    }
    if(this.tasksObj.finished.includes(i))
    {
      task = i;
      this.openEditDialog(task)
    }
  }

  editTask(task: any, result: Task)
  {
    if(this.tasksObj.toDos.includes(task))
    {
      if(task.taskStatus == taskStatuses[1].status) {
        let index = this.tasksObj.toDos.indexOf(task);
        let newStatus = this.tasksObj.toDos[index];
        this.tasksObj.toDos.splice(task, 1)
        this.tasksObj.inProgress.push(newStatus);
      }
    else
      {
        this.tasksObj.toDos.splice(task, 1, result);
      }
      console.log(this.tasksObj)
    }
    if(this.tasksObj.inProgress.includes(task))
    {
      this.tasksObj.inProgress.splice(task, 1, result);
    }
    if(this.tasksObj.finished.includes(task))
    {
      this.tasksObj.finished.splice(task, 1, result);
    }
  }

  deleteTask(arr: Array<Task>, i: any)
  {
    // if(this.tasksObj.toDos.includes(i))
    // {
    //   this.tasksObj.toDos.splice(i, 1);
    // }
    // if(this.tasksObj.inProgress.includes(i))
    // {
    //   this.tasksObj.inProgress.splice(i, 1);
    // }
    // if(this.tasksObj.finished.includes(i))
    // {
    //   this.tasksObj.finished.splice(i, 1);
    // }
    console.log(arr.indexOf(i));
    let index = arr.indexOf(i);
    arr.splice(index, 1);
    console.log(this.tasksObj)
  }

  openEditDialog(task: Task)
  {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {taskText: task.taskText,
        taskStatus: task.taskStatus}
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!task && res))
      .subscribe(result => {
        this.editTask(task, result);
    });
  }

  openDeleteDialog(arr: Array<Task>, element: Task)
  {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      data: {taskText: element.taskText}
    });

    dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
      });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(() => this.deleteTask(arr, element));
  }

  openAlertDialog(alertText: string)
  {
    this.dialog.open(AlertModalDialogComponent, {
      data: { alertText: alertText }
    });
  }

  drop(event: CdkDragDrop<Task[]>)
  {
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

}
