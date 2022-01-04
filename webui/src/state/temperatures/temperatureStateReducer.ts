import { TemperatureAction } from "./temperatureAction";
import { TemperatureState } from "./TemperatureStateContext";

export const temperatureStateReducer = (state: TemperatureState, action: TemperatureAction): TemperatureState => {
  switch (action.type) {
    case "SELECT_DATERANGE": {
      const selectedDateRange = state.dateRanges.find((dateRange) => dateRange.dateRangeId === action.payload);

      const filteredTemperatures = state.allTemperatures.filter(selectedDateRange!.temperatureFilter);

      return {
        ...state,
        selectedDateRangeId: action.payload,
        filteredTemperatures: filteredTemperatures,
      };
    }
    case "SET_SHOWINSIDE": {
      return { ...state, showInside: action.payload as boolean };
    }
    case "SET_SHOWOUTSIDE": {
      return { ...state, showOutside: action.payload as boolean };
    }
    default: {
      return state;
    }
  }
};
