import { createContext, useContext, useState } from "react";
import { PiState } from "./PiState";
import { withInitialState } from "./withInitialState";

type PiStateContextProps = {
  node: string;
  uptime: string;
  memory: string;
  cpu: string;
  temperature: string;
  fanspeed: string;
  disk: {
    total: string;
    used: string;
    available: string;
  };
};

const PiStateContext = createContext<PiStateContextProps>(
  {} as PiStateContextProps
);

type PiStateProviderProps = {
  children: React.ReactNode;
  initialState: PiState;
};

export const PiStateProvider = withInitialState<PiStateProviderProps>(
  ({ children, initialState }) => {
    const [state] = useState(initialState);

    return (
      <PiStateContext.Provider
        value={{
          node: state.node,
          uptime: state.uptime,
          cpu: state.cpu,
          fanspeed: state.fanspeed,
          memory: state.memory,
          temperature: state.temperature,
          disk: state.disk,
        }}
      >
        {children}
      </PiStateContext.Provider>
    );
  }
);

export const usePiState = () => {
  return useContext(PiStateContext);
};
