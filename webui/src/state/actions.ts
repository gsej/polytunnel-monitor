export type Action = {
  type: "SELECT_DATERANGE";
  payload: string;
};

export const selectDateRange = (dateRangeId: string): Action => ({ type:  "SELECT_DATERANGE", payload: dateRangeId});