import { useState, useEffect } from "react";
import { loadCurrentTemperatures } from "../api";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { AppState } from "./AppStateContext";

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
          const currentTemperatures =
            await loadCurrentTemperatures<CurrentTemperatures>();

          const newState = { ...basicInitialState, currentTemperatures };

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
