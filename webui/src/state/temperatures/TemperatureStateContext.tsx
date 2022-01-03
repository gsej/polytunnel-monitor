import { createContext, useContext, useReducer, Dispatch } from "react";
import { TemperatureEntry } from "./TemperatureEntry";
import { TemperatureAction } from "./temperatureActions";
import { temperatureStateReducer } from "./temperatureStateReducer";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRange } from "./DateRange";
import { withInitialState } from "./withInitialState";

export type TemperatureState = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  allTemperatures: TemperatureEntry[];
  filteredTemperatures: TemperatureEntry[];
  showInside: boolean;
  showOutside: boolean;
};

type TemperatureStateContextProps = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  allTemperatures: TemperatureEntry[];
  filteredTemperatures: TemperatureEntry[];
  showInside: boolean;
  showOutside: boolean;
  dispatch: Dispatch<TemperatureAction>;
};

const TemperatureStateContext = createContext<TemperatureStateContextProps>(
  {} as TemperatureStateContextProps
);

type TemperatureStateProviderProps = {
  children: React.ReactNode;
  initialState: TemperatureState;
};

export const TemperatureStateProvider = withInitialState<TemperatureStateProviderProps>(
  ({ children, initialState }) => {
    const [state, dispatch] = useReducer(temperatureStateReducer, initialState);
    const { dateRanges, selectedDateRangeId, currentTemperatures, timestamp, allTemperatures, filteredTemperatures, showInside, showOutside } =
      state;

    return (
      <TemperatureStateContext.Provider
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
      </TemperatureStateContext.Provider>
    );
  }
);

export const useTemperatureState = () => {
  return useContext(TemperatureStateContext);
};
