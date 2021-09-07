import {Component, Input, OnInit} from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import { taskStatuses } from "../../../shared/constants/taskStatuses";
import { AddNewTask } from "../../../store/actions/actions";
import { Store } from "@ngrx/store";
import { IAppState } from "../../../shared/interfaces/IAppState";
import { MatDialog } from "@angular/material/dialog";
import { AlertModalDialogComponent } from "../../../shared/modals/alert-modal-dialog/alert-modal-dialog.component";

@Component({
  selector: 'toDoCreateForm-UI',
  templateUrl: './toDoCreateForm-UI.html',
  styleUrls: ['./toDoCreateForm-UI.css'],
})
export class ToDoCreateFormUI implements OnInit {

  @Input()
  taskList!: Array<ITaskItem>;

  taskName:string = '';
  taskStatus: string = '';
  taskDetails: string = '';
  addDetails!: boolean;

  constructor(private store$: Store<IAppState>,
              public dialog: MatDialog) { }

  ngOnInit(): void {}

  toggleForm()
  {
    this.addDetails = !this.addDetails;
    this.taskDetails = '';
  }

  writeStatus(event: string): void
  {
    this.taskStatus = event;
  }

  checkUserInput(): void
  {
    if(!this.taskStatus)
    {
      this.taskStatus = taskStatuses[0].status;
    }

    let newTaskItem: ITaskItem  = {
      taskText: this.taskName.trim(),
      taskStatus: this.taskStatus,
      taskId: this.generateId(),
      taskDetails: this.taskDetails,
    };

    if(!newTaskItem.taskText)
    {
      const alertText = "Unable to add empty task!";
      this.openAlertDialog(alertText);
    }

    else if(this.taskList.some(task => task.taskText == newTaskItem.taskText))
    {
      const alertText = "This task has already created";
      this.openAlertDialog( alertText );
    }

    else
      this.onSubmit(newTaskItem);
  }

  generateId(): number
  {
    let taskId = Math.floor(Math.random() * (1000 + 1));

    if (this.taskList.find(task => task.taskId == taskId))
    {
      return this.generateId();
    }

    return taskId;
  }

  onSubmit(newTaskItem: ITaskItem)
  {
    this.emitTask(newTaskItem);
    this.cleanForm();
  }

  openAlertDialog(alertText: string): void
  {
    this.dialog.open(AlertModalDialogComponent, {
      data: {
        alertText: alertText,
      }
    });
  }

  emitTask(taskItem: ITaskItem)
  {
    this.store$.dispatch(new AddNewTask(taskItem));
  }

  cleanForm()
  {
    this.taskName = '';
    this.taskStatus = '';
    this.taskDetails =''
  }
}