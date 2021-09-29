import React from 'react';
import { CurrentTemperatures } from './CurrentTemperatures';
import { DateRange } from './daterange';
import { DateRangeSelectorList } from './DateRangeSelectorList';
import { TimeStamp } from './TimeStamp';
import styles from './Temperatures.module.css';
import { dateRanges } from './dateRanges';
import { TemperatureChart } from './TemperatureChart';

interface CurrentReadings {
  insideTemperature: number | null;
  outsideTemperature: number | null;
  timeStamp: Date | null;
}

interface State {
  dateRanges: DateRange[];
  selectedDateRange: DateRange;
  currentTemperatures: CurrentReadings;
}

export class Temperatures extends React.Component {
 
 
  state: State;
  dateRanges = dateRanges;

  handleDateRangeChange = (dateRangeId: string) => {
    const selectedDateRange = this.dateRanges.find(dateRange => dateRange.dateRangeId === dateRangeId);

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
      currentTemperatures: {
        insideTemperature: null,
        outsideTemperature: null,
        timeStamp: null
      }
    };
  }

  componentDidMount() {
    this.setState(this.state);
    this.getCurrentTemperatures();
  }

  getCurrentTemperatures() {
    // TODO: move this to configuration somehow
    fetch('http://api.polytunnel2.gsej.co.uk/api/currenttemperatures')
      .then(response => response.json())
      .then(currentTemperatures => {
        this.setState({
          ...this.state,
          currentTemperatures: {
            insideTemperature: currentTemperatures.insideTemperature,
            outsideTemperature: currentTemperatures.outsideTemperature,
            timeStamp: new Date()
          }
        });
      });

  }


  render() {
    return (
      <section>
        <h1>{this.state.selectedDateRange.label}</h1>
        <CurrentTemperatures
          insideTemperature={this.state.currentTemperatures.insideTemperature}
          outsideTemperature={this.state.currentTemperatures.outsideTemperature}
        />
        <div className={styles["tab-container"]}>
          <DateRangeSelectorList
            dateRanges={this.state.dateRanges}
            selectedDateRange={this.state.selectedDateRange}
            onChange={this.handleDateRangeChange}
          /></div>
        <TimeStamp
          timeStamp={this.state.currentTemperatures.timeStamp}
        />
        <TemperatureChart>        
          
        </TemperatureChart>

      </section>
    );
  }

}
