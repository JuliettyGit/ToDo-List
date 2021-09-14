import { Component, OnInit } from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import { IAppState } from "../../../shared/interfaces/IAppState";
import { select, Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { finishedTasks, taskListSelector, tasksInProgress, tasksToDoSelector } from "../../../store/selectors/selectors";

@Component({
  selector: 'appToDoList-widget',
  templateUrl: './toDoList-widget.component.html',
  styleUrls: ['./toDoList-widget.component.css']
})

export class ToDoListWidgetComponent implements OnInit {

  taskList$: Observable<Array<ITaskItem>> = this.store$.pipe(select(taskListSelector));
  tasksToDo$: Observable<Array<ITaskItem>> = this.store$.pipe(select(tasksToDoSelector));
  tasksInProgress$: Observable<Array<ITaskItem>> = this.store$.pipe(select(tasksInProgress));
  finishedTasks$: Observable<Array<ITaskItem>> = this.store$.pipe(select(finishedTasks));


  constructor(private store$: Store<IAppState>) { }

  ngOnInit(): void {}
}
