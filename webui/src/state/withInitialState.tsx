import { useState, useEffect } from "react";
import { loadCurrentTemperatures, loadTemperatures } from "./api";
import { AppState } from "./AppStateContext";
import { RawTemperatureEntry } from "./RawTemperatureEntry";

type InjectedProps = {
  initialState: AppState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

const basicInitialState: AppState = {
  dateRanges: [
    {
      dateRangeId: "today",
      label: "Today",
    },
    {
      dateRangeId: "last24hours",
      label: "Last 24 Hours",
    },
    {
      dateRangeId: "lastweek",
      label: "Last Week",
    },
    {
      dateRangeId: "whoknows",
      label: "Who Knows",
    },
  ],
  selectedDateRangeId: "today",
  currentTemperatures: {
    insideTemperature: 12.4,
    outsideTemperature: null,
  },
  timestamp: new Date(),
  allTemperatures: [
    {
      timestamp: new Date('2021-01-01T10:00'),
      insideTemperature: 10,
      outsideTemperature: 20
    },

    {
      timestamp: new Date('2021-01-05T10:00'),
      insideTemperature: 10,
      outsideTemperature: 20
    },
    {
      timestamp: new Date('2021-01-07T10:00'),
      insideTemperature: 10,
      outsideTemperature: 20
    }
  ]
};

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] =
      useState<AppState>(basicInitialState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const currentTemperatures = await loadCurrentTemperatures();
          const allRawTemperatures = await loadTemperatures();
          const allTemperatures = allRawTemperatures
          .map((td: RawTemperatureEntry) => {
                      return {
                        timestamp: new Date(td.timestamp),
                        outsideTemperature: td.outsideTemperature,
                        insideTemperature: td.insideTemperature
          }});
          

          const newState = { ...basicInitialState, currentTemperatures, allTemperatures };

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
