import React from "react";

type CanvasContext = {
  canvas: HTMLCanvasElement | null;
  zoom?: number;
};

export const Context = React.createContext<CanvasContext>({ canvas: null });

function CanvasContextProvider({
  children,
  value,
}: React.PropsWithChildren<{ value: CanvasContext }>) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export default CanvasContextProvider;
