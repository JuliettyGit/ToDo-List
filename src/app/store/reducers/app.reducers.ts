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
    default:
    {
      return state
    }
  }
}


