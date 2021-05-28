import React from 'react';
import { CurrentTemperatures } from './CurrentTemperatures';
import { DateRange } from './daterange';
import { DateRangeSelectorList } from './DateRangeSelectorList';
import './Temperatures.css';

export class Temperatures extends React.Component {

  state: any; // TODO: should not be any

  dateRanges: DateRange[] = [
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


  constructor(props: any) {
    super(props);

    this.state = {
      dateRanges: this.dateRanges,
      selectedDateRange: this.dateRanges[0],
      currentTemperatures: {
        inside: 11,
        outside: null
      }
    };
  }

  componentDidMount() {
    this.setState(this.state);
  }

  render() {

    return (
      <section>
        <h1>{this.state.selectedDateRange.label}</h1>
        <CurrentTemperatures
          insideTemperature={this.state.currentTemperatures.inside}
          outsideTemperature={this.state.currentTemperatures.outside}
        />
        <DateRangeSelectorList
          dateRanges={this.state.dateRanges} />

      </section>
    );
  }

}