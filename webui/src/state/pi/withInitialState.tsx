import { useState, useEffect } from "react";
import { loadPiStatus } from "../api";
import { PiState } from "./PiState";

type InjectedProps = {
  initialState: PiState;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

const basicInitialState: PiState = {
  node: "Unknown",
    uptime: "Unknown",
    memory: "Unknown",
    cpu: "Unknown",
    temperature: "Unknown",
    fanspeed: "Unknown",
    disk: {
      total: "Unknown",
      used: "Unknown",
      available: "Unknown",
    }
};

export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<
    PropsWithoutInjected<TProps> & InjectedProps
  >
) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<PiState>(basicInitialState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const piState = await loadPiStatus();
        setInitialState(piState);
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