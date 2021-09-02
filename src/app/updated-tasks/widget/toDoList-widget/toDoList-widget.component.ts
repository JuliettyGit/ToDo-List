import { Component, OnInit } from '@angular/core';
import { ITaskItem } from "../../../shared/interfaces/ITaskItem";
import { IAppState } from "../../../shared/interfaces/IAppState";
import {select, Store} from '@ngrx/store';
import { AddNewTask } from "../../../store/actions/actions";
import {Observable} from "rxjs";
import {taskListSelector} from "../../../store/selectors/selectors";

@Component({
  selector: 'appToDoList-widget',
  templateUrl: './toDoList-widget.component.html',
  styleUrls: ['./toDoList-widget.component.css']
})
export class ToDoListWidgetComponent implements OnInit {

  taskList$: Observable<ITaskItem[]> = this.store$.pipe(select(taskListSelector));

  constructor(private store$: Store<IAppState>) { }

  ngOnInit(): void {
  }

  onCreate(taskItem: ITaskItem)
  {
    this.store$.dispatch(new AddNewTask(taskItem));
  }
}
