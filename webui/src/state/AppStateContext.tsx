import { createContext, useContext, FC, useReducer, Dispatch } from "react"
import { Action } from "./actions"
import { appStateReducer } from "./appStateReducer"
import { DateRange } from "./DateRange"

export type AppState = {
  dateRanges: DateRange[],
  selectedDateRangeId: string
}

type AppStateContextProps = {
  dateRanges: DateRange[],
  selectedDateRangeId: string,
  dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>(
  {} as AppStateContextProps
)

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
    }
  ],
  selectedDateRangeId: "today" 
};

export const AppStateProvider: FC = ({ children }) => {
const [state, dispatch] = useReducer(appStateReducer, appData)
  const { dateRanges, selectedDateRangeId } = state;

  // const getTasksByListId = (id: string) => {
  //   return lists.find((list) => list.id === id)?.tasks || []
  // }

  return (
    <AppStateContext.Provider value={{ dateRanges, selectedDateRangeId, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  return useContext(AppStateContext)
}
