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

  addTask(newTask: Task)
  {

    switch (newTask.taskStatus)
    {
      case taskStatuses[0].status:
      {
          this.tasksObj.toDos.push(newTask);
          break;
      }
      case taskStatuses[1].status:
      {
        this.tasksObj.inProgress.push(newTask);
        break;
      }
      case taskStatuses[2].status:
      {
        this.tasksObj.finished.push(newTask);
      }
    }

    this.taskInput = '';
    return this.tasksObj;
  }

  checkUserInput()
  {
    if(!this.status)
    {
      this.status = taskStatuses[0].status;
    }

    let newTask: Task  =
      {
        taskText: this.taskInput.trim(),
        taskStatus: this.status,
      };

    let tasksArr = Object.values(this.tasksObj);
    let newTasksArr = Array.prototype.concat.apply([], tasksArr);

    if(newTask.taskText === '')
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
      console.log(this.tasksObj)
    }

    if(newTasksArr.some(task => task.taskText == newTask.taskText))
    {
        const alertText = "This task has already created";
        this.openAlertDialog(alertText);
        this.taskInput = '';
    }

    else
    {
    this.addTask(newTask);
    }
  }

  openEditDialog(arr: Array<Task>, task: Task)
  {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {
        taskText: task.taskText,
        taskStatus: task.taskStatus
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!task && res))
      .subscribe(result => {
        this.editTask(arr, task, result);
    });
  }

  editTask(arr: Array<Task>, task: any, result: Task)
  {
    let index = arr.indexOf(task);
    arr.splice(index, 1, result);
    task.taskStatus = result.taskStatus;
    task.taskText = result.taskText;

    if(task.taskStatus == taskStatuses[0].status)
    {
      arr.splice(task, 1);
      this.tasksObj.toDos.push(task);
    }

    if(task.taskStatus == taskStatuses[1].status)
    {
      arr.splice(task, 1);
      this.tasksObj.inProgress.push(task);
    }

    if(task.taskStatus == taskStatuses[2].status)
    {
      arr.splice(task, 1);
      this.tasksObj.finished.push(task);
    }
    console.log(this.tasksObj)
  }

  openDeleteDialog(element: Task)
  {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      data: {
        taskText: element.taskText
      }
    });

    dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
      });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(() => this.deleteTask(element));
  }

  deleteTask(el: Task)
  {
    // let newTasksArr = Array.prototype.concat.apply([], Object.values(this.tasksObj));
    // newTasksArr = newTasksArr.filter(task => task.taskText !== el.taskText);
    // console.log(newTasksArr, this.tasksObj);

    // for (let elem in newTasksArr)
    // {
    //   let qwe = newTasksArr[elem].taskText;
    //   console.log(qwe);
    //   newTasksArr = newTasksArr.filter(qwe => qwe == el.taskText);
    //   console.log(newTasksArr)
    // }

    //work
    this.tasksObj.toDos = this.tasksObj.toDos.filter(task => task.taskText !== el.taskText);
    this.tasksObj.inProgress = this.tasksObj.inProgress.filter(task => task.taskText !== el.taskText);
    this.tasksObj.finished = this.tasksObj.finished.filter(task => task.taskText !== el.taskText)
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
