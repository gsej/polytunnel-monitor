import { DateRange } from "./daterange";

export const dateRanges: DateRange[] = [
    {
      dateRangeId: "last24",
      label: "Last 24 hours",
      displayFormat: "HH mm",
      temperatureFilter: (t: any) => {
        const now = new Date();
        const dayAgo = new Date();
        dayAgo.setHours(dayAgo.getHours() - 24);
        return t.timestamp >= dayAgo && t.timestamp <= now;
      }
    },
    {
      dateRangeId: "today",
      label: "Today",
      displayFormat: "HH mm",
      temperatureFilter: (t: any) => {
        const today = new Date();
        const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        return t.timestamp >= startOfDay && t.timestamp <= endOfDay;
      }
    },
    {
      dateRangeId: "lastweek",
      label: "Last Week",
      displayFormat: "dd MMM HH mm",
      temperatureFilter: (t: any) => {
        const now = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return t.timestamp >= weekAgo && t.timestamp <= now;
      }
    },
    {
      dateRangeId: "all",
      label: "All",
      displayFormat: "dd MMM HH mm",
      temperatureFilter: (t: any) => true
    },
  ];