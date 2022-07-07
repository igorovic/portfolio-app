import React from "react";
import { ParsedImage } from "./types";

interface State {
  currentImage: ParsedImage | null;
}

interface Action {
  type: string;
  payload?: any;
}

const defaultState: State = {
  currentImage: null,
};
type ContextType = [State, React.Dispatch<Action>];

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_IMAGE":
      return {
        ...state,
        currentImage: action.payload,
      };
    default:
      return state;
  }
};

const Context = React.createContext<ContextType>([
  defaultState,
  (a: Action) => undefined,
]);

function StateProvider({ children }: React.PropsWithChildren<any>) {
  const stateContext = React.useReducer(reducer, defaultState);
  return <Context.Provider value={stateContext}>{children}</Context.Provider>;
}

export default StateProvider;

export const useContextState = () => React.useContext<ContextType>(Context);

export const useDispatch = () => React.useContext<ContextType>(Context)[1];

export const useImage = () => {
  const { currentImage } = React.useContext<ContextType>(Context)[0];
  return React.useState(() => {
    return currentImage;
  });
};
