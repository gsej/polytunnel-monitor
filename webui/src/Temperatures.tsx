import React from 'react';
import { CurrentTemperatures } from './CurrentTemperatures';
import { DateRange } from './daterange';
import { DateRangeSelectorList } from './DateRangeSelectorList';
import { TimeStamp } from './TimeStamp';
import styles from './Temperatures.module.css';
import { dateRanges } from './dateRanges';
import { TemperatureChart } from './TemperatureChart';
import { TemperatureEntry } from './TemperatureEntry';

interface TemperatureState {
  dateRanges: DateRange[];
  selectedDateRange: DateRange;
  insideTemperature: number | null;
  outsideTemperature: number | null;
  timestamp: Date | null;
}

export class Temperatures extends React.Component<{}, TemperatureState> {

  dateRanges = dateRanges;

  handleDateRangeChange = (dateRangeId: string) => {
    const selectedDateRange = this.dateRanges
      .find(dateRange => dateRange.dateRangeId === dateRangeId)
      || this.dateRanges[0];

    this.setState({
      ...this.state,
      selectedDateRange
    })
  };

  constructor(props: any) {
    super(props);

    this.state = {
      dateRanges: this.dateRanges,
      selectedDateRange: this.dateRanges[0],
      insideTemperature: null,
      outsideTemperature: null,
      timestamp: null,
    };
  }

  componentDidMount() {
    this.setState(this.state);
    this.getCurrentTemperatures();
  }

  getCurrentTemperatures() {
    // TODO: move this url to configuration somehow
    fetch('http://api.polytunnel2.gsej.co.uk/api/currenttemperatures')
      .then(response => response.json())
      .then(currentTemperatures => {

        this.setState({
          ...this.state,
          insideTemperature: currentTemperatures.insideTemperature,
          outsideTemperature: currentTemperatures.outsideTemperature,
          timestamp: new Date(),
        });
      });
  }

  

  padToTwoDigits(number: number) {
    if (number > 9) { return "" + number; } else { return "0" + number; }
  }

  render() {
    return (
      <section>
        <h1>{this.state.selectedDateRange.label}</h1>
        <CurrentTemperatures
          insideTemperature={this.state.insideTemperature}
          outsideTemperature={this.state.outsideTemperature}
        />
        <div className={styles["tab-container"]}>
          <DateRangeSelectorList
            dateRanges={this.state.dateRanges}
            selectedDateRange={this.state.selectedDateRange}
            onChange={this.handleDateRangeChange}
          /></div>
        <TimeStamp
          timestamp={this.state.timestamp}
        />
        <TemperatureChart> </TemperatureChart>

      </section>
    );
  }

}
