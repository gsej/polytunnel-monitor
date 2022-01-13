import { TemperatureEntry } from "./TemperatureEntry";
import { CurrentTemperatures } from "./CurrentTemperatures";
import { DateRange } from "./DateRange";

export type TemperatureState = {
  title: string;
  dateRanges: DateRange[];
  selectedDateRangeId: string;
  currentTemperatures: CurrentTemperatures;
  timestamp: Date | null;
  temperatures: TemperatureEntry[];
  showInside: boolean;
  showOutside: boolean;
}