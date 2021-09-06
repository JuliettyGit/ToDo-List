import { Action } from '@ngrx/store';

import { ITaskItem } from "../../shared/interfaces/ITaskItem";

export enum EUserActions {
  AddNewTask = '[Task List] Add task to the task list',
  EditTask = '[Task List] Edit task',
  DeleteTask = '[Task List] Delete task from task list',
  DragNDrop = '[Drag and Drop] Change task status'
}

export class AddNewTask implements Action {
  public readonly type = EUserActions.AddNewTask;
  constructor(public payload: ITaskItem) {}
}

export class EditTask implements Action {
  public readonly type = EUserActions.EditTask;
  constructor(public payload: ITaskItem[])
  {}
}

export class DeleteTask implements Action {
  public readonly type = EUserActions.DeleteTask;
  constructor(public payload: ITaskItem)
  {}
}

export class DragNDrop implements Action {
  public readonly type = EUserActions.DragNDrop;
  constructor(public payload: [ITaskItem, string])
  {}
}

export type UserActions = AddNewTask | EditTask | DeleteTask | DragNDrop ;
