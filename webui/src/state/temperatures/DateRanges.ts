const today = new Date();

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

const weekAgo = new Date();
weekAgo.setDate(weekAgo.getDate() - 7);

const monthAgo = new Date();
monthAgo.setDate(monthAgo.getDate() - 30);

export const dateRanges = [
  {
    dateRangeId: "today",
    label: "Today",
    displayFormat: "HH mm",
    startDate: today.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
    decimationFactor: 5
  },
  {
    dateRangeId: "lastTwoDays",
    label: "Last two days",
    displayFormat: "HH mm",
    startDate: yesterday.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
    decimationFactor: 5
  },
  {
    dateRangeId: "lastWeek",
    label: "Last Week",
    displayFormat: "HH mm",
    startDate: weekAgo.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
    decimationFactor: 5
  },
  {
    dateRangeId: "last30Days",
    label: "Last thirty days",
    displayFormat: "HH mm",
    startDate: monthAgo.toISOString().substring(0, 10),
    endDate: today.toISOString().substring(0, 10),
    decimationFactor: 10
  },
  {
    dateRangeId: "all",
    label: "All",
    displayFormat: "dd MMM HH mm",
    startDate: "2021-01-01",
    endDate: "2025-01-01",
    decimationFactor: 50,
  },
];
