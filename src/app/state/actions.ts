import {createAction, props} from "@ngrx/store";
import { Task } from "../shared/interfaces/task";


export const addTask = createAction(
  '[TaskList] add task',
  props<Task>()
);



