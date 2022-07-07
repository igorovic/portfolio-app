import React from "react";

interface State {
  unsplashImageW: string;
}

interface Action {
  type: string;
  payload?: any;
}

const defaultState: State = {
  unsplashImageW: "",
};
type ContextType = [State, React.Dispatch<Action>];

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case "SET_UNSPLASH_IMAGE_WIDTH":
      return {
        ...state,
        unsplashImageW: action.payload,
      };
    case "RESET":
      return {
        ...state,
        unsplashImageW: "",
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
