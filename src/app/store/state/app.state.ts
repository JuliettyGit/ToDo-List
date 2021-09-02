import { IAppState } from "../../shared/interfaces/IAppState";

export const initialAppState: IAppState = {
  taskList: [],
};

export function getInitialAppState(): IAppState
{
  return initialAppState;
}
