import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import { taskStatuses } from "../../../shared/constants/taskStatuses";
import {AddNewTask} from "../../../store/actions/actions";
import {Store} from "@ngrx/store";
import {IAppState} from "../../../shared/interfaces/IAppState";


@Component({
  selector: 'toDoCreateForm-UI',
  templateUrl: './toDoCreateForm-UI.html',
  styleUrls: ['./toDoCreateForm-UI.css']
})
export class ToDoCreateFormUI implements OnInit {

  taskName:string = '';
  taskStatus: string = '';


  @Output()
  createTask = new EventEmitter<ITaskItem>()

  constructor(private store$: Store<IAppState>) { }

  ngOnInit(): void {}

  writeStatus(event: string): void
  {
    this.taskStatus = event;
  }

  onSubmit()
  {
      this.createTaskItem();
      this.cleanForm();
  }

  checkUserInput(): void
  {
    if(!this.taskStatus)
    {
      this.taskStatus = taskStatuses[0].status;
    }

    this.onSubmit();

    // let newTask: Task  = {
    //     taskText: this.taskName.trim(),
    //     taskStatus: this.taskStatus,
    // }
    //
    // let tasksArr = Object.values(this.tasks);
    // let newTasksArr = Array.prototype.concat.apply([], tasksArr);
    //
    // if(!newTask.taskText)
    // {
    //   const alertText = "Unable to add empty task!";
    //   this.openAlertDialog(alertText);
    // }
    //
    // else if(newTasksArr.some(task => task.taskText == newTask.taskText))
    // {
    //   const alertText = "This task has already created";
    //   this.openAlertDialog( alertText );
    //   this.taskInput = '';
    // }
  }

  cleanForm()
  {
    this.taskName = '';
    this.taskStatus = '';
  }

  createTaskItem()
  {
    const taskItem: ITaskItem = {taskText: this.taskName, taskStatus: this.taskStatus};

    taskItem.taskText = this.taskName;
    taskItem.taskStatus = this.taskStatus;
    this.emitTask(taskItem);
  }

  emitTask(taskItem: ITaskItem)
  {
    this.store$.dispatch(new AddNewTask(taskItem));
  }
}
