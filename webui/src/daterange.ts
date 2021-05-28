export interface DateRange {
    dateRangeId: string,
    label: string,
    displayFormat: string,
    temperatureFilter: (t: string) => boolean
}