import { PiStatus } from "./pi/PiStatus";
import { CurrentTemperatureState } from "./temperatures/CurrentTemperatureState";
import { TemperatureEntry } from "./temperatures/TemperatureEntry";
import { TunnelCamImage } from "./tunnelcam/TunnelCamImage";

export const loadCurrentTemperatures = () => {
  return fetch("https://api.polytunnel.gsej.co.uk/api/currenttemperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<CurrentTemperatureState>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadTemperatureRange = (startDate: string, endDate: string) => {
  return fetch("https://api.polytunnel.gsej.co.uk/api/temperaturerange/" + startDate + "/" + endDate).then((response) => {
    if (response.ok) {
      return response.json() as Promise<TemperatureEntry[]>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadPiStatus = () => {
  return fetch("https://api.polytunnel.gsej.co.uk/api/pistatus").then((response) => {
    if (response.ok) {
      return response.json() as Promise<PiStatus>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadTunnelCam = () => {
  return fetch("https://api.polytunnel.gsej.co.uk/api/tunnelcam").then((response) => {
    if (response.ok) {
      return response.json() as Promise<TunnelCamImage>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};
