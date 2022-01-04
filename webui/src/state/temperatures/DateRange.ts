import { TemperatureEntry } from "./TemperatureEntry";

export type DateRange = {
	dateRangeId: string,
	label: string,
	displayFormat: string,
	temperatureFilter: (temperatureEntry: TemperatureEntry) => boolean
    }