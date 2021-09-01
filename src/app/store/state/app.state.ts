import { IAppState } from "../../shared/interfaces/IAppState";

export const initialAppState: IAppState = {
  tasks: [],
};

export function getInitialAppState(): IAppState
{
  return initialAppState;
}
