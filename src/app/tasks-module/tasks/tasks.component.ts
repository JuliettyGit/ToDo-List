import { Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent } from '../../shared/modals/edit-modal-dialog/edit-modal-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent } from '../../shared/modals/delete-modal-dialog/delete-modal-dialog.component';
import { AlertModalDialogComponent } from '../../shared/modals/alert-modal-dialog/alert-modal-dialog.component';
import { ITaskItem } from "../../shared/interfaces/ITaskItem";
import { filter } from 'rxjs/operators';
import { taskStatuses } from 'src/app/shared/constants/taskStatuses'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import {ITaskListState} from "../../shared/interfaces/ITaskListState";

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

  tasks: any = {
    tasksToDo: new Array<ITaskItem>(),
    tasksInProgress: new Array<ITaskItem>(),
    finishedTasks: new Array<ITaskItem>(),
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  writeStatus(event: string): void
  {
    this.status = event;
  }

  addTask(newTask: ITaskItem): void
  {
    switch (newTask.taskStatus)
    {
      case taskStatuses[0].status:
        this.tasks.tasksToDo.push(newTask);
        break;

      case taskStatuses[1].status:
        this.tasks.tasksInProgress.push(newTask);
        break;

      case taskStatuses[2].status:
        this.tasks.finishedTasks.push(newTask);
    }

    this.taskInput = '';
    this.status = taskStatuses[0].status;
  }

  checkUserInput(): void
  {
    if(!this.status)
    {
      this.status = taskStatuses[0].status;
    }

    let newTask: ITaskItem  =
      {
        taskText: this.taskInput.trim(),
        taskStatus: this.status,
      };

    let tasksArr = Object.values(this.tasks);
    let newTasksArr = Array.prototype.concat.apply([], tasksArr);

    if(!newTask.taskText)
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if(newTasksArr.some(task => task.taskText == newTask.taskText))
    {
      const alertText = "This task has already created";
      this.openAlertDialog( alertText );
      this.taskInput = '';
    }

    else
      this.addTask( newTask );
  }

  filterTasks(filteredTask: ITaskItem)
  {
    // let keys = Object.keys(this.tasks);
    // for(let i = 0; i <= keys.length; i++)
    // {
    //   this.tasks[key][i] = this.tasks[key][i].filter((task: ITaskItem) => task !== filteredTask);
    // }
    for (let key in this.tasks)
    {
        this.tasks[key] = this.tasks[key].filter((task: ITaskItem) => task !== filteredTask);
    }
  }

  openEditDialog(editingTask: ITaskItem): void
  {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {
        taskText: editingTask.taskText,
        taskStatus: editingTask.taskStatus
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!editingTask && res))
      .subscribe(result => {
        this.editTask(editingTask, result);
      });
  }

  editTask(editingTask: ITaskItem, result: ITaskItem): void
  {
    this.filterTasks(editingTask);

    switch (result.taskStatus)
    {
      case taskStatuses[0].status:
        this.tasks.tasksToDo.push(result);
        break;

      case taskStatuses[1].status:
        this.tasks.tasksInProgress.push(result);
        break;

      case taskStatuses[2].status:
        this.tasks.finishedTasks.push(result);
        break;
    }
  }

  openDeleteDialog(taskToDelete: ITaskItem): void
  {
    const dialogRef = this.dialog.open(DeleteModalDialogComponent, {
      data: {
        taskText: taskToDelete.taskText
      }
    });

    dialogRef.backdropClick()
      .subscribe(() => {
        dialogRef.close();
      });

    dialogRef.afterClosed()
      .pipe(filter(res => !!res))
      .subscribe(() => this.deleteTask(taskToDelete));
  }

  deleteTask(taskToDelete: ITaskItem): void
  {
    this.filterTasks(taskToDelete);
  }

  openAlertDialog(alertText: string): void
  {
    this.dialog.open(AlertModalDialogComponent, {
      data: {
        alertText: alertText
      }
    });
  }

  drop(event: CdkDragDrop<ITaskItem[]>): void
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
