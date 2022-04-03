import { useEffect, useState } from "react";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DataSeriesSelector } from "./DataSeriesSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { loadCurrentTemperatures, loadTemperatureRange } from "./state/api";
import { DateRange } from "./state/temperatures/DateRange";
import { dateRanges } from "./state/temperatures/DateRanges";
import { useCurrentTemperaturesState, useInitialState, useSelectedDateRangeId, useTemperatures, useTitle } from "./state/temperatures/TemperatureState";
import { TemperatureChart } from "./TemperatureChart";
import styles from "./Temperatures.module.css";
import { TimeStamp } from "./TimeStamp";

export const Temperatures = () => {
  const [title, setTitle] = useTitle();
  const [state, setState] = useInitialState();
  const [currentTemperatures, setCurrentTemperatures] = useCurrentTemperaturesState();
  const [temperatures, setTemperatures] = useTemperatures();
  const [selectedDateRangeId, setSelectedDateRangeId] = useSelectedDateRangeId();

  const [spanGapsMultiplier, setSpanGapsMultipler] = useState(5);

  useEffect(() => {
    const fetchCurrentTemperatures = async () => {
      const currentTemperatures = await loadCurrentTemperatures();
      setCurrentTemperatures(currentTemperatures);
    };
    fetchCurrentTemperatures();
  }, [setCurrentTemperatures]);

  useEffect(() => {
    const fetchTemperatures = async () => {
      const selectedDateRange = dateRanges.find((dr) => dr.dateRangeId === selectedDateRangeId) as DateRange;
      setTitle(selectedDateRange.label);
      setSpanGapsMultipler(selectedDateRange.decimationFactor / 5);
      const temperatures = await loadTemperatureRange(selectedDateRange.startDate, selectedDateRange.endDate, selectedDateRange.decimationFactor);
      setTemperatures(temperatures);
    };
    fetchTemperatures();
  }, [selectedDateRangeId, setTemperatures, setTitle]);

  const handleDateRangeChange = (selectedDateRangeId: string) => {
    setSelectedDateRangeId(selectedDateRangeId);
  };

  const handleInsideChange = (showInside: boolean) => {
    setState({ ...state, showInside });
  };

  const handleOutsideChange = (showOutside: boolean) => {
    setState({ ...state, showOutside });
  };

  const handleDifferenceChange = (showDifference: boolean) => {
    setState({ ...state, showDifference });
  };
  return (
    <section>
      <h1>{title}</h1>
      <CurrentTemperatures insideTemperature={currentTemperatures.insideTemperature} outsideTemperature={currentTemperatures.outsideTemperature} />
      <div className={styles["tab-container"]}>
        <DateRangeSelector dateRanges={dateRanges} selectedDateRangeId={selectedDateRangeId} onChange={handleDateRangeChange}></DateRangeSelector>
      </div>
      <TemperatureChart spanGapsMultiplier={spanGapsMultiplier} showInside={state.showInside} showOutside={state.showOutside} showDifference={state.showDifference} temperatures={temperatures}></TemperatureChart>
      <TimeStamp timestamp={state.timestamp} />
      <div>
        <DataSeriesSelector onChangeInside={handleInsideChange} onChangeOutside={handleOutsideChange} onChangeDifference={handleDifferenceChange} showInside={state.showInside} showOutside={state.showOutside} showDifference={state.showDifference}></DataSeriesSelector>
      </div>
    </section>
  );
};
