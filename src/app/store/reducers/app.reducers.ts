import {EUserActions, UserActions} from "../actions/actions";
import {initialAppState} from "../state/app.state";

export const TODO_REDUCER_NODE = 'toDo';

// export function appReducer(
//   state = initialAppState,
//   action: UserActions)
// {
//   switch (action.type) {
//     case EUserActions.AddNewTask:
//     {
//         return {
//           ...state,
//           tasks: [...state.tasks, action.payload],
//         };
//     }
//     default:
//     {
//       return state
//     }
//   }
// }
export const appReducer = (state = initialAppState, action: UserActions) =>
{
    switch (action.type) {
    case EUserActions.AddNewTask:
    {
        return {
          ...state,
          tasks: [...state.tasks, action.payload],
        };
    }
    default:
    {
      return state
    }
  }
}


