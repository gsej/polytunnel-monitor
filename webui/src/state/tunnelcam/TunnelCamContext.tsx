import { createContext, useContext, useState } from "react";
import { TunnelCamImage } from "./TunnelCamImage";
import { withInitialState } from "./withInitialState";

type TunnelCamContextProps = {
  latestImageUrl: string;
};

const TunnelCamContext = createContext<TunnelCamContextProps>(
  {} as TunnelCamContextProps
);

type TunnelCamProviderProps = {
  children: React.ReactNode;
  initialState: TunnelCamImage;
};

export const TunnelCamProvider = withInitialState<TunnelCamProviderProps>(
  ({ children, initialState }) => {
    const [state] = useState(initialState);

    return (
      <TunnelCamContext.Provider
        value={{
          latestImageUrl: state.url,
        }}
      >
        {children}
      </TunnelCamContext.Provider>
    );
  }
);

export const useTunnelCam = () => {
  return useContext(TunnelCamContext);
};
