import { Action } from "./actions";
import { AppState } from "./AppStateContext";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SELECT_DATERANGE": {
      const selectedDateRange = state.dateRanges.find(
        (dateRange) => dateRange.dateRangeId === action.payload
      );

      const filteredTemperatures = state.allTemperatures.filter(
        selectedDateRange!.temperatureFilter
      );

      return {
        ...state,
        selectedDateRangeId: action.payload,
        filteredTemperatures: filteredTemperatures
      };
    }
    default: {
      return state;
    }
  }
};
