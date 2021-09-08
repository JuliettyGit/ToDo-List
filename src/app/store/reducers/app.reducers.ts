import { EUserActions, UserActions } from "../actions/actions";
import { initialAppState } from "../state/app.state";
import { IAppState } from "../../shared/interfaces/IAppState";

export const TODO_REDUCER_NODE = 'toDoList';

export const appReducer =
  (state: IAppState = initialAppState, action: UserActions) =>
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
        taskList: state.taskList.filter(task => task.taskId !== action.payload.taskId),
      }

    case EUserActions.EditTask:
      return {
        ...state,
        taskList: state.taskList.map(task => task.taskId === action.payload[0].taskId ?
          {
            taskText: action.payload[1].taskText,
            taskStatus: action.payload[1].taskStatus,
            taskId: task.taskId,
            taskDetails: action.payload[1].taskDetails,
            deadline: action.payload[1].deadline
          } : task)
      }

    case EUserActions.DragNDrop:
      return {
        ...state,
        taskList: state.taskList.map(task => task.taskId === action.payload[0].taskId ?
          {
            taskText: task.taskText,
            taskStatus: action.payload[1],
            taskId: task.taskId,
            taskDetails: task.taskDetails,
            deadline: task.deadline
          } : task)
      }

    default:
    {
      return state
    }
  }
}


