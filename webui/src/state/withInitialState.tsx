import { useState, useEffect } from "react";
import { loadCurrentTemperatures, loadTemperatures } from "./api";
import { AppState } from "./AppStateContext";
import { RawTemperatureEntry } from "./RawTemperatureEntry";

type InjectedProps = {
  initialState: AppState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

const basicInitialState: AppState = {
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
        return (
          temperatureEntry.timestamp >= dayAgo &&
          temperatureEntry.timestamp <= now
        );
      },
    },
    {
      dateRangeId: "today",
      label: "Today",
      displayFormat: "HH mm",
      temperatureFilter: (temperatureEntry) => {
        const today = new Date();
        const startOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        );
        const endOfDay = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate(),
          23,
          59,
          59
        );
        return (
          temperatureEntry.timestamp >= startOfDay &&
          temperatureEntry.timestamp <= endOfDay
        );
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
        return (
          temperatureEntry.timestamp >= weekAgo &&
          temperatureEntry.timestamp <= now
        );
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

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<AppState>(basicInitialState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const currentTemperatures = await loadCurrentTemperatures();
          const allRawTemperatures = await loadTemperatures();
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

          const selectedDateRange = basicInitialState.dateRanges.find(
            (dateRange) =>
              dateRange.dateRangeId === basicInitialState.selectedDateRangeId
          );
          const filteredTemperatures = allTemperatures.filter(
            selectedDateRange!.temperatureFilter
          );

          const newState = {
            ...basicInitialState,
            currentTemperatures,
            allTemperatures,
            filteredTemperatures
          };

          setInitialState(newState);
        } catch (e: any) {
          setError(e);
        }
        setIsLoading(false);
      };
      fetchInitialState();
    }, []);

    if (isLoading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return <WrappedComponent {...props} initialState={initialState} />;
  };
}
