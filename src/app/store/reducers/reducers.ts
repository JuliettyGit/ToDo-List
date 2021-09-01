// import { createReducer, on } from "@ngrx/store";
// import { initialTaskListState } from "src/app/store/state/initialTaskListState";
// import * as TaskListActions from '../actions/actions';
//
// //state только одно поле tasks
// //селекторы для каждой группы
// export const taskListReducer = createReducer(
//   initialTaskListState,
//   on(TaskListActions.addTask, (state, action) => ({
//     ...state,
//     tasksToDo: state.tasksToDo,
//     tasksInProgress: state.tasksInProgress,
//     finishedTasks: state.finishedTasks
//   })),
//
//   on(TaskListActions.editTask, state => ({
//     ...state,
//
//   })),
//
//   on(TaskListActions.deleteTask, state => ({
//   ...state,
//
// }))
// );

// //state только одно поле tasks
// //селекторы для каждой группы

import { AddNewTask, EUserActions } from "../actions/actions";
import { UserActions } from "../actions/actions";
import { initialTaskListState } from "../state/initialTaskListState";
import { ITaskListState } from "../../shared/interfaces/ITaskListState";
import { initialAppState } from "../state/app.state";
import { IAppState } from "../../shared/interfaces/IAppState";

export const taskListReducer = (
  state = initialTaskListState,
    action: UserActions
): ITaskListState => {
  return {
    ...state,

  };
}
