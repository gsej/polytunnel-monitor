import { useState, useEffect } from "react";
import { loadTunnelCam } from "../api";
import { TunnelCamImage } from "./TunnelCamImage";

type InjectedProps = {
  initialState: TunnelCamImage;
};

type PropsWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>;

const basicInitialState: TunnelCamImage = {
  url: "",
};

export function withInitialState<TProps>(WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps> & InjectedProps>) {
  return (props: PropsWithoutInjected<TProps>) => {
    const [initialState, setInitialState] = useState<TunnelCamImage>(basicInitialState);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | undefined>();

    useEffect(() => {
      const fetchInitialState = async () => {
        try {
          const tunnelCamImage = await loadTunnelCam();
          setInitialState(tunnelCamImage);
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
