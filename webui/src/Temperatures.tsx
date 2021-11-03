import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRangeSelector } from "./DateRangeSelector";
import { selectDateRange } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { TemperatureChart } from "./TemperatureChart";
import styles from "./Temperatures.module.css";
import { TimeStamp } from "./TimeStamp";

export const Temperatures = () => {
  const {
    dateRanges,
    selectedDateRangeId,
    currentTemperatures,
    timestamp,
    allTemperatures,
    dispatch,
  } = useAppState();

  const handleDateRangeChange = (dateRangeId: string) => {
    dispatch(selectDateRange(dateRangeId));
  };

  const selectedDateRange = dateRanges.find(
    (dr) => dr.dateRangeId === selectedDateRangeId
  );
  const title = selectedDateRange?.label || "Unknown";

  return (
    <section>
      <h1>{title}</h1>
      <CurrentTemperatures
        insideTemperature={currentTemperatures.insideTemperature}
        outsideTemperature={currentTemperatures.outsideTemperature}
      />
      <div className={styles["tab-container"]}>
        <DateRangeSelector
          dateRanges={dateRanges}
          selectedDateRangeId={selectedDateRangeId}
          onChange={handleDateRangeChange}
        ></DateRangeSelector>
      </div>
      <TemperatureChart
      allTemperatures={allTemperatures}> </TemperatureChart>
      <TimeStamp timestamp={timestamp} />
    </section>
  );
};
