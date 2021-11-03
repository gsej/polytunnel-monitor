import { createContext, useContext, FC, useReducer, Dispatch } from "react";
import { Action } from "./actions";
import { appStateReducer } from "./appStateReducer";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRange } from "./DateRange";

export type AppState = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
};

type AppStateContextProps = {
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  dispatch: Dispatch<Action>;
};

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
);

const appData: AppState = {
  dateRanges: [
    {
      dateRangeId: "today",
      label: "Today",
    },
    {
      dateRangeId: "last24hours",
      label: "Last 24 Hours",
    },
    {
      dateRangeId: "lastweek",
      label: "Last Week",
    },
    {
      dateRangeId: "whoknows",
      label: "Who Knows",
    },
  ],
  selectedDateRangeId: "today",
  currentTemperatures: {
    insideTemperature: 12.4,
    outsideTemperature: null,
  },
  timestamp: new Date(),
};

export const AppStateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, appData);
  const { dateRanges, selectedDateRangeId, currentTemperatures, timestamp} = state;

  // const getTasksByListId = (id: string) => {
  //   return lists.find((list) => list.id === id)?.tasks || []
  // }

  return (
    <AppStateContext.Provider
      value={{
        dateRanges,
        selectedDateRangeId,
        currentTemperatures,
        timestamp,
        dispatch,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  return useContext(AppStateContext);
};
