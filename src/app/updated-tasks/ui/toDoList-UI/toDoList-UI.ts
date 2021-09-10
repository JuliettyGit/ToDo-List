import {Component, OnInit, Input } from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import { CdkDragDrop, moveItemInArray, transferArrayItem } from "@angular/cdk/drag-drop";
import { DeleteModalDialogComponent } from "../../../shared/modals/delete-modal-dialog/delete-modal-dialog.component";
import { filter } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { EditModalDialogComponent } from "../../../shared/modals/edit-modal-dialog/edit-modal-dialog.component";
import {DeleteTask, DragNDrop, EditTask} from "../../../store/actions/actions";
import { Store } from "@ngrx/store";
import { IAppState } from "../../../shared/interfaces/IAppState";
import {AlertModalDialogComponent} from "../../../shared/modals/alert-modal-dialog/alert-modal-dialog.component";

@Component({
  selector: 'appToDoList-UI',
  templateUrl: './toDoList-UI.html',
  styleUrls: ['./toDoList-UI.css']
})
export class ToDoListUI implements OnInit {

  @Input()
  taskList!: Array<ITaskItem>;

  @Input()
  tasksToDo!: Array<ITaskItem>;

  @Input()
  tasksInProgress!: Array<ITaskItem>;

  @Input()
  finishedTasks!: Array<ITaskItem>;

  constructor(public dialog: MatDialog,
              private store$: Store<IAppState>) { }

  ngOnInit(): void {}

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
      .subscribe(() => this.store$.dispatch(new DeleteTask(taskToDelete)));
  }

  openEditDialog(editingTask: ITaskItem): void
  {
    const dialogRef = this.dialog.open(EditModalDialogComponent, {
      data: {
        taskText: editingTask.taskText,
        taskStatus: editingTask.taskStatus,
        taskDetails: editingTask.taskDetails,
      }
    });

    dialogRef.afterClosed()
      .pipe(filter(res => !!editingTask && res))
      .subscribe(result  => this.store$.dispatch(new EditTask([editingTask, result])))
  }

  openAlertDialog(taskText: string,taskDetails: string, taskStatus: string, deadline: Date): void
  {
    this.dialog.open(AlertModalDialogComponent, {
      data: {
        alertText: taskText,
        description: taskDetails,
        taskStatus: taskStatus,
        deadline: deadline
      }
    });
  }


  drop(event: CdkDragDrop<ITaskItem[]>, newTaskStatus: string): void
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
      let data = event.container.data[0];
      console.log(data);
      console.log(newTaskStatus)
      this.store$.dispatch(new DragNDrop([data, newTaskStatus]))
    }
  }
}
