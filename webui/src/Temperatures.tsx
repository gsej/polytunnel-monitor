import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRangeSelector } from "./DateRangeSelector";
import { selectDateRange } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import styles from "./Temperatures.module.css";

export const Temperatures = () => {
  const { dateRanges, selectedDateRangeId, currentTemperatures, dispatch } = useAppState();
  
  const handleDateRangeChange = (dateRangeId: string) => {
	dispatch(selectDateRange(dateRangeId));
  };

      const selectedDateRange = dateRanges.find(dr => dr.dateRangeId === selectedDateRangeId);
      const title = selectedDateRange?.label || "Unknown";

  return (


      <section>

        <h1>{title}</h1>
        <CurrentTemperatures
          insideTemperature={currentTemperatures.insideTemperature}
          outsideTemperature={currentTemperatures.outsideTemperature}
        />
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
