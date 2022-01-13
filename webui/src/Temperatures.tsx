import { useEffect, useState } from "react";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DataSeriesSelector } from "./DataSeriesSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { loadCurrentTemperatures, loadTemperatureRange, loadTemperatures } from "./state/api";
import { DateRange } from "./state/temperatures/DateRange";
import { RawTemperatureEntry } from "./state/temperatures/RawTemperatureEntry";
import { TemperatureState } from "./state/temperatures/TemperatureState";
import { TemperatureChart } from "./TemperatureChart";
import styles from "./Temperatures.module.css";
import { TimeStamp } from "./TimeStamp";

export const Temperatures = () => {
  const today = new Date();

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const initialState: TemperatureState = {
    title: "",
    showInside: true,
    showOutside: true,
    dateRanges: [
      {
        dateRangeId: "today",
        label: "Today",
        displayFormat: "HH mm",
        startDate: today.toISOString().substring(0, 10),
        endDate: today.toISOString().substring(0, 10),
      },
      {
        dateRangeId: "lastTwoDays",
        label: "Last two days",
        displayFormat: "HH mm",
        startDate: yesterday.toISOString().substring(0, 10),
        endDate: today.toISOString().substring(0, 10),
      },
      {
        dateRangeId: "lastWeek",
        label: "Last Week",
        displayFormat: "HH mm",
        startDate: weekAgo.toISOString().substring(0, 10),
        endDate: today.toISOString().substring(0, 10),
      },
      {
        dateRangeId: "all",
        label: "All",
        displayFormat: "dd MMM HH mm",
        startDate: "2021-01-01",
        endDate: "2025-01-01",
      },
    ],
    selectedDateRangeId: "today",
    currentTemperatures: {
      insideTemperature: null,
      outsideTemperature: null,
    },
    timestamp: new Date(),
    allTemperatures: [],
    filteredTemperatures: [],
  };
  const selectedDateRange = initialState.dateRanges.find((dr) => dr.dateRangeId === initialState.selectedDateRangeId) as DateRange;
  initialState.title = selectedDateRange.label;

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchTemperatures = async () => {
      const currentTemperatures = await loadCurrentTemperatures();

      const selectedDateRange = state.dateRanges.find((dr) => dr.dateRangeId === state.selectedDateRangeId) as DateRange;
      const allRawTemperatures = await loadTemperatureRange(selectedDateRange.startDate, selectedDateRange.endDate);

      const t0 = performance.now();
      const allTemperatures = allRawTemperatures.map(
        // TODO: can this mapping be avoided?
        (td: RawTemperatureEntry) => {
          return {
            timestamp: new Date(td.timestamp),
            outsideTemperature: td.outsideTemperature,
            insideTemperature: td.insideTemperature,
          };
        }
      );

      const t1 = performance.now();
      console.log("Call to map temperatures took " + (t1 - t0) + " milliseconds.");
      const filteredTemperatures = allTemperatures;

      setState({ ...state, currentTemperatures, allTemperatures, filteredTemperatures, title: selectedDateRange.label });
    };
    fetchTemperatures();
  }, [state.selectedDateRangeId]);

  const handleDateRangeChange = (selectedDateRangeId: string) => {
    setState({ ...state, selectedDateRangeId });
  };

  const handleInsideChange = (showInside: boolean) => {
    setState({ ...state, showInside });
  };

  const handleOutsideChange = (showOutside: boolean) => {
    setState({ ...state, showOutside });
  };

  return (
    <section>
      <h1>{state.title}</h1>
      <CurrentTemperatures insideTemperature={state.currentTemperatures.insideTemperature} outsideTemperature={state.currentTemperatures.outsideTemperature} />
      <div className={styles["tab-container"]}>
        <DateRangeSelector dateRanges={state.dateRanges} selectedDateRangeId={state.selectedDateRangeId} onChange={handleDateRangeChange}></DateRangeSelector>
      </div>
      <TemperatureChart showInside={state.showInside} showOutside={state.showOutside} filteredTemperatures={state.filteredTemperatures}></TemperatureChart>
      <TimeStamp timestamp={state.timestamp} />
      <div>
        <DataSeriesSelector onChangeInside={handleInsideChange} onChangeOutside={handleOutsideChange} showInside={state.showInside} showOutside={state.showOutside}></DataSeriesSelector>
      </div>
    </section>
  );
};
