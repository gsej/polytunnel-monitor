import { CurrentTemperatures } from "./CurrentTemperatures";
import { DataSeriesSelector } from "./DataSeriesSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { selectDateRange, setShowInside, setShowOutside } from "./state/actions";
import { useAppState } from "./state/AppStateContext";
import { TemperatureChart } from "./TemperatureChart";
import styles from "./Temperatures.module.css";
import { TimeStamp } from "./TimeStamp";

export const Temperatures = () => {
  const { dateRanges, selectedDateRangeId, currentTemperatures, timestamp, filteredTemperatures, showInside, showOutside, dispatch } = useAppState();

  const handleDateRangeChange = (dateRangeId: string) => {
    dispatch(selectDateRange(dateRangeId));
  };

  const handleInsideChange = (show: boolean) => {
    dispatch(setShowInside(show));
  };
  const handleOutsideChange = (show: boolean) => {
    dispatch(setShowOutside(show));
  };

  const selectedDateRange = dateRanges.find((dr) => dr.dateRangeId === selectedDateRangeId);
  const title = selectedDateRange?.label || "Unknown";

  return (
    <section>
      <h1>{title}</h1>
      <CurrentTemperatures insideTemperature={currentTemperatures.insideTemperature} outsideTemperature={currentTemperatures.outsideTemperature} />
      <div className={styles["tab-container"]}>
        <DateRangeSelector dateRanges={dateRanges} selectedDateRangeId={selectedDateRangeId} onChange={handleDateRangeChange}></DateRangeSelector>
      </div>
      <TemperatureChart showInside={showInside} showOutside={showOutside} filteredTemperatures={filteredTemperatures}></TemperatureChart>
      <TimeStamp timestamp={timestamp} />
      <div>
        <DataSeriesSelector onChangeInside={handleInsideChange} onChangeOutside={handleOutsideChange} showInside={showInside} showOutside={showOutside}></DataSeriesSelector>
      </div>
    </section>
  );
};
