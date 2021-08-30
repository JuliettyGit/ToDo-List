import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import {TaskListState } from 'src/app/shared/interfaces/taskListState';
import { taskListReducer } from 'src/app/state/reducers'
import { environment } from '../../environments/environment';

export interface State {
  TaskList: TaskListState;
}

export const reducers: ActionReducerMap<State> = {
  TaskList: taskListReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
