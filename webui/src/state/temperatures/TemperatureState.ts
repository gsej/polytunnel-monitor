import { useState } from "react";
import { CurrentTemperatureState } from "./CurrentTemperatureState";
import { TemperatureEntry } from "./TemperatureEntry";

export type TemperatureState = {
  timestamp: Date | null;
  showInside: boolean;
  showOutside: boolean;
  showDifference: boolean;
}

const initialCurrentTemperatures: CurrentTemperatureState = {
  insideTemperature: null, 
  outsideTemperature: null 
}

export const useCurrentTemperaturesState = () => {
  return useState(initialCurrentTemperatures);
}

export const useSelectedDateRangeId = () => {
  return useState("today" );
}

const initialState: TemperatureState = {
  showInside: true,
  showOutside: true,
  showDifference: true,
  timestamp: new Date()
};

export const useInitialState = () => {
  return useState(initialState);
}

const initialTemperatures: TemperatureEntry[] = [];

export const useTemperatures = () => {
  return useState(initialTemperatures);
}

export const useTitle = () => {
  return useState("Today");
}