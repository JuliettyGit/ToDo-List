import { IAppState } from "../../shared/interfaces/IAppState";
import { AddNewTask, EUserActions, UserActions } from "../actions/actions";
import { initialAppState } from "../state/app.state";
import { ActionReducerMap, createAction, createReducer, on } from "@ngrx/store";

export const appReducers: ActionReducerMap<IAppState> = {
  tasks: appReducer
};

export function appReducer(
  state = initialAppState,
  action: UserActions)
{
  // const task = action.payload;
  // const tasks = [...state.tasks, task];
  return {
    ...state,
    tasks: [...state.tasks, action.payload],
  };
}


