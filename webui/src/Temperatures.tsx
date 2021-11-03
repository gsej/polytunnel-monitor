import { DateRangeSelector } from "./DateRangeSelector";
import { selectDateRange } from "./state/actions";
import { useAppState } from "./state/AppStateContext";

export const Temperatures = () => {
  const { dateRanges, selectedDateRangeId, dispatch } = useAppState();
  
  const handleDateRangeChange = (dateRangeId: string) => {
	dispatch(selectDateRange(dateRangeId));
  };

  return (
    <div>
      <h3>temperatures component</h3>
      <DateRangeSelector
        dateRanges={dateRanges}
        selectedDateRangeId={selectedDateRangeId}
	onChange={handleDateRangeChange}
      ></DateRangeSelector>
    </div>
  );
};
