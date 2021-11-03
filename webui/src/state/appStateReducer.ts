import { Action } from "./actions";
import { AppState } from "./AppStateContext";

export const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "SELECT_DATERANGE": {
      return {
        ...state,
        selectedDateRangeId: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
