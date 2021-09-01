import { Component, Input, OnInit } from '@angular/core';
import { EditModalDialogComponent} from "../../tasks-module/edit-modal-dialog/edit-modal-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalDialogComponent } from "../../tasks-module/delete-modal-dialog/delete-modal-dialog.component";
import { AlertModalDialogComponent } from "../../tasks-module/alert-modal-dialog/alert-modal-dialog.component";
import { ITaskItem} from "../../shared/interfaces/ITaskItem";
import { filter } from 'rxjs/operators';
import { taskStatuses } from 'src/app/shared/constants/taskStatuses'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { Store } from "@ngrx/store";
import { AddNewTask, DeleteTask, EditTask } from "../../store/actions/actions";

@Component(
  {
    selector: 'app-updated-tasks',
    templateUrl: './updated-tasks.component.html',
    styleUrls: ['./updated-tasks.component.css']
  })

export class UpdatedTasksComponent implements OnInit {

  @Input() setStatus: void;

  taskInput: string = '';
  status: string = '';

  tasks: any = {
    toDos: new Array<ITaskItem>(),
    inProgress: new Array<ITaskItem>(),
    finished: new Array<ITaskItem>(),
  }

  constructor(public dialog: MatDialog,
              private store: Store) {}

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
        this.tasks.toDos.push(newTask);
        break;

      case taskStatuses[1].status:
        this.tasks.inProgress.push(newTask);
        break;

      case taskStatuses[2].status:
        this.tasks.finished.push(newTask);
    }

    this.store.dispatch(new AddNewTask(newTask));

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
        this.tasks.toDos.push(result);
        break;

      case taskStatuses[1].status:
        this.tasks.inProgress.push(result);
        break;

      case taskStatuses[2].status:
        this.tasks.finished.push(result);
        break;
    }

    this.store.dispatch(new EditTask(result));
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
    this.store.dispatch(new DeleteTask(taskToDelete));
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
