import { DateRangeSelector } from "./DateRangeSelector";
import { selectDateRange } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import styles from "./Temperatures.module.css";

export const Temperatures = () => {
  const { dateRanges, selectedDateRangeId, dispatch } = useAppState();
  
  const handleDateRangeChange = (dateRangeId: string) => {
	dispatch(selectDateRange(dateRangeId));
  };

  return (

      <section>
      <h3>temperatures component</h3>

        {/* <h1>{this.state.selectedDateRange.label}</h1> */}
        {/* <CurrentTemperatures
          insideTemperature={this.state.insideTemperature}
          outsideTemperature={this.state.outsideTemperature}
        /> */}
        <div className={styles["tab-container"]}>
        {/* <TimeStamp
          timestamp={this.state.timestamp}
        />
        <TemperatureChart> </TemperatureChart> */}

      <DateRangeSelector
        dateRanges={dateRanges}
        selectedDateRangeId={selectedDateRangeId}
	onChange={handleDateRangeChange}
      ></DateRangeSelector>
      </div>
	</section>
  );
};
