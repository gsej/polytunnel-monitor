import { createContext, useContext, useReducer, Dispatch } from "react";
import { PiAction } from "./piActions";
import { PiState } from "./PiState";
import { piStateReducer } from "./piStateReducer";
import { withInitialState } from "./withInitialState";

//TODO: should this actually be about PiProps rather than state? 


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
  dispatch: Dispatch<PiAction>;
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
    const [state, dispatch] = useReducer(piStateReducer, initialState);

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
          dispatch
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
