import { Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent } from '../delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../alert-modal-dialog/alert-modal-dialog.component';
import { Task } from './task';
import { filter } from 'rxjs/operators';
import { taskStatuses } from 'src/app/shared/constants/taskStatuses'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";

@Component(
  {
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  })

export class TasksComponent implements OnInit {

  @Input() setStatus: void;

  taskInput: string = '';
  status: string = '';

  tasksObj: any = {
    toDos: new Array<Task>(),
    inProgress: new Array<Task>(),
    finished: new Array<Task>(),
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  writeStatus( event: string )
  {
    this.status = event;
  }

  addTask( newTask: Task )
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
    if( !this.status )
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

    if( newTask.taskText === '' )
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if( newTasksArr.some(task => task.taskText == newTask.taskText) )
    {
        const alertText = "This task has already created";
        this.openAlertDialog( alertText );
        this.taskInput = '';
    }

    else
      this.addTask( newTask );
  }

  openEditDialog( task: Task )
  {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {
        taskText: task.taskText,
        taskStatus: task.taskStatus
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!task && res ))
      .subscribe(result => {
        this.editTask( task, result );
    });
  }

  editTask( editingTask: Task, result: Task )
  {
    for ( let key in this.tasksObj )
    {
      this.tasksObj[key] = this.tasksObj[key].filter((task: Task) => task !== editingTask);
    }

    switch (result.taskStatus)
    {
      case taskStatuses[0].status:
      {
        this.tasksObj.toDos.push(result);
        break;
      }

      case taskStatuses[1].status:
      {
          this.tasksObj.inProgress.push(result);
          break;
      }

      case taskStatuses[2].status:
      {
          this.tasksObj.finished.push(result);
          break;
      }
    }
  }

  openDeleteDialog( element: Task )
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

  deleteTask( element: Task )
  {
    for ( let key in this.tasksObj )
    {
      this.tasksObj[key] = this.tasksObj[key].filter((task: Task) => task.taskText !== element.taskText);
    }
  }

  openAlertDialog( alertText: string )
  {
    this.dialog.open( AlertModalDialogComponent, {
      data: { alertText: alertText }
    });
  }

  drop( event: CdkDragDrop<Task[]> )
  {
    if ( event.previousContainer === event.container )
    {
      moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
    }

    else
    {
      transferArrayItem( event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex );
    }
  }

}
