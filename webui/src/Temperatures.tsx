import { useEffect, useState } from "react";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DataSeriesSelector } from "./DataSeriesSelector";
import { DateRangeSelector } from "./DateRangeSelector";
import { loadCurrentTemperatures, loadTemperatures } from "./state/api";
import { RawTemperatureEntry } from "./state/temperatures/RawTemperatureEntry";
import { TemperatureState } from "./state/temperatures/TemperatureState";
import { TemperatureChart } from "./TemperatureChart";
import styles from "./Temperatures.module.css";
import { TimeStamp } from "./TimeStamp";

export const Temperatures = () => {
  // const { dateRanges, selectedDateRangeId, currentTemperatures, timestamp, filteredTemperatures, showInside, showOutside, dispatch } = useTemperatureState();

  const initialState: TemperatureState = {
    showInside: true,
    showOutside: true,
    dateRanges: [
      {
        dateRangeId: "last24",
        label: "Last 24 hours",
        displayFormat: "HH mm",
        temperatureFilter: (temperatureEntry) => {
          const now = new Date();
          const dayAgo = new Date();
          dayAgo.setHours(dayAgo.getHours() - 24);
          return temperatureEntry.timestamp >= dayAgo && temperatureEntry.timestamp <= now;
        },
      },
      {
        dateRangeId: "today",
        label: "Today",
        displayFormat: "HH mm",
        temperatureFilter: (temperatureEntry) => {
          const today = new Date();
          const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
          return temperatureEntry.timestamp >= startOfDay && temperatureEntry.timestamp <= endOfDay;
        },
      },
      {
        dateRangeId: "lastweek",
        label: "Last Week",
        displayFormat: "dd MMM HH mm",
        temperatureFilter: (temperatureEntry) => {
          const now = new Date();
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return temperatureEntry.timestamp >= weekAgo && temperatureEntry.timestamp <= now;
        },
      },
      {
        dateRangeId: "all",
        label: "All",
        displayFormat: "dd MMM HH mm",
        temperatureFilter: (t) => true,
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

  const [state, setState] = useState(initialState);

  useEffect(() => {
    const fetchTemperatures = async () => {
      const currentTemperatures = await loadCurrentTemperatures();
      const allRawTemperatures = await loadTemperatures();

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
      const filteredTemperatures = allTemperatures.slice(0, 20);

      setState({ ...state, currentTemperatures, allTemperatures, filteredTemperatures });
    };
    fetchTemperatures();
  }, []);

  const handleDateRangeChange = (selectedDateRangeId: string) => {
    //   dispatch(selectDateRange(dateRangeId));
    //    const selectedDateRange = state.dateRanges.find((dr) => dr.dateRangeId === dateRangeId);
    setState({ ...state, selectedDateRangeId });
  };

  const handleInsideChange = (showInside: boolean) => {
    setState({ ...state, showInside });
    //  dispatch(setShowInside(show));
  };
  const handleOutsideChange = (showOutside: boolean) => {
    setState({ ...state, showOutside });
    // dispatch(setShowOutside(show));
  };

  //const selectedDateRange = dateRanges.find((dr) => dr.dateRangeId === selectedDateRangeId);
  const title = "Unknown"; // selectedDateRange?.label || "Unknown";

  return (
    <section>
      <h1>{title}</h1>
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
