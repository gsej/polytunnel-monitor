import { PiState } from "./pi/PiState";
import { CurrentTemperatures } from "./temperatures/CurrentTemperatures";
import { RawTemperatureEntry } from "./temperatures/RawTemperatureEntry";

export const loadCurrentTemperatures = () => {
  return fetch("https://polytunnel.gsej.co.uk/api/currenttemperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<CurrentTemperatures>;
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadTemperatures= () => {
  return fetch("https://polytunnel.gsej.co.uk/api/temperatures").then((response) => {
    if (response.ok) {
      return response.json() as Promise<RawTemperatureEntry[]>; // TODO: map this before returning???
    } else {
      throw new Error("Something went wrong.");
    }
  });
};

export const loadPiState = () => {
  return fetch("https://polytunnel.gsej.co.uk/api/pi").then((response) => {
    if (response.ok) {
      return response.json() as Promise<PiState>; 
    } else {
      throw new Error("Something went wrong.");
    }
  });
};
