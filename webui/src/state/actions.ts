export type Action = {
  type: "SELECT_DATERANGE";
  payload: string;
} | {
  type: "SET_SHOWINSIDE";
  payload: boolean;
} | {
  type: "SET_SHOWOUTSIDE";
  payload: boolean;
};

export const selectDateRange = (dateRangeId: string): Action => ({ type:  "SELECT_DATERANGE", payload: dateRangeId});

export const setShowInside = (show: boolean): Action => ({ type:  "SET_SHOWINSIDE", payload: show});
export const setShowOutside = (show: boolean): Action => ({ type:  "SET_SHOWOUTSIDE", payload: show});