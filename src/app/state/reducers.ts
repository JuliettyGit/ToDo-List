import { createReducer, on } from "@ngrx/store";
import { initialTaskListState } from "src/app/state/initialState";
import { addTask } from "./actions";


//state только одно поле tasks
//селекторы для каждой группы
export const taskListReducer = createReducer(
  initialTaskListState,
  on(addTask, (state, action) => ({
    ...state,
    //
    tasksToDo: initialTaskListState.tasksToDo.concat(action).filter(task => task.taskStatus  == "To Do"),
    tasksInProgress: initialTaskListState.tasksInProgress.concat(action).filter(task => task.taskStatus  == "In Progress"),
    finishedTasks: initialTaskListState.finishedTasks.concat(action).filter(task => task.taskStatus  == "Finished"),
  }))
)
