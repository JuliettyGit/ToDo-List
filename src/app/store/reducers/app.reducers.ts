import { EUserActions, UserActions } from "../actions/actions";
import { initialAppState } from "../state/app.state";

export const TODO_REDUCER_NODE = 'toDo';

export const appReducer =
  (state = initialAppState, action: UserActions) =>
{
  switch (action.type)
  {
    case EUserActions.AddNewTask:
    {
        return {
          ...state,
          taskList: [...state.taskList, action.payload],
        };
    }
    case EUserActions.DeleteTask:
      return {
        ...state,
        taskList: state.taskList.filter(task => task.taskText !== action.payload.taskText),
      }

    case EUserActions.EditTask:
      return {
        ...state,
        taskList: state.taskList.map(task => task.taskText === action.payload[0].taskText && task.taskStatus === action.payload[0].taskStatus ?
          {
            taskText: action.payload[1].taskText,
            taskStatus: action.payload[1].taskStatus
          } : task)
      }

    default:
    {
      return state
    }
  }
}


