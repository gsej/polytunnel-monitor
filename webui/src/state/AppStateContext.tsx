import { createContext, useContext, useReducer, Dispatch } from "react";
import { TemperatureEntry } from "./TemperatureEntry";
import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRange } from "./DateRange";
import { withInitialState } from "./withInitialState";

export type AppState = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  allTemperatures: TemperatureEntry[];
  filteredTemperatures: TemperatureEntry[];
  showInside: boolean;
  showOutside: boolean;
};

type AppStateContextProps = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  allTemperatures: TemperatureEntry[];
  filteredTemperatures: TemperatureEntry[];
  showInside: boolean;
  showOutside: boolean;
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

type AppStateProviderProps = {
  children: React.ReactNode;
  initialState: AppState;
};

export const AppStateProvider = withInitialState<AppStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useReducer(appStateReducer, initialState);
    const { dateRanges, selectedDateRangeId, currentTemperatures, timestamp, allTemperatures, filteredTemperatures, showInside, showOutside } =
      state;

    return (
      <AppStateContext.Provider
        value={{
          dateRanges,
          selectedDateRangeId,
          currentTemperatures,
          timestamp,
          allTemperatures,
          filteredTemperatures,
          showInside,
          showOutside,
          dispatch,
        }}
      >
        {children}
      </AppStateContext.Provider>
    );
  }
);

export const useAppState = () => {
  return useContext(AppStateContext);
};
