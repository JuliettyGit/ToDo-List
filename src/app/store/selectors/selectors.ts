import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TODO_REDUCER_NODE} from "../reducers/app.reducers";
import {IAppState} from "../../shared/interfaces/IAppState";
import {ITaskItem} from "../../shared/interfaces/ITaskItem";


export const taskListFutureSelector = createFeatureSelector<IAppState>(TODO_REDUCER_NODE);

export const taskListSelector = createSelector(
  taskListFutureSelector,
  state => state.taskList
  //first time return null && undefined
);

export const tasksToDoSelector = createSelector(
  taskListFutureSelector,
  (state) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == 'To Do');
  }
);

export const tasksInProgress= createSelector(
  taskListFutureSelector,
  (state) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == 'In Progress');
  }
);
export const finishedTasks= createSelector(
  taskListFutureSelector,
  (state) =>
  {
    const data: ITaskItem[] = Object.values(state.taskList);
    return data.filter((taskItem: ITaskItem) => taskItem.taskStatus == 'Finished');
  }
);
