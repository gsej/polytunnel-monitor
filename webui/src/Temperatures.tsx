import React from 'react';
import { CurrentTemperatures } from './CurrentTemperatures';
import { DateRange } from './daterange';
import { DateRangeSelectorList } from './DateRangeSelectorList';
import { TimeStamp } from './TimeStamp';
import styles from './Temperatures.module.css';
import { dateRanges } from './dateRanges';
import { TemperatureChart } from './TemperatureChart';

// interface RawTemperatureData {
//   insideTemperature: number | null;
//   outsideTemperature: number | null;
//   timeStamp: string;
// }

// interface TemperatureData {
//   insideTemperature: number | null;
//   outsideTemperature: number | null;
//   timeStamp: Date | null;
// }

interface State {
  dateRanges: DateRange[];
  selectedDateRange: DateRange;
  insideTemperature: number | null;
  outsideTemperature: number | null;
  timeStamp: Date | null;
}

export class Temperatures extends React.Component<{}, State> {
  
  dateRanges = dateRanges;

  //allTemperatures = [];
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
      timeStamp: null
    };
  }

  componentDidMount() {
    this.setState(this.state);
    this.getCurrentTemperatures();
    //    this.getTemperatures();
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
          timeStamp: new Date(),
        });
      });
  }

  // getTemperatures() {
  //   fetch('http://api.polytunnel2.gsej.co.uk/api/temperatures')
  //     .then(response => response.json())
  //     .then((temperatureData => {
  //       // TODO: integrate into state?
  //       this.allTemperatures = temperatureData
  //         .map((td: RawTemperatureData) => {
  //           return {
  //             timestamp: new Date(td.timeStamp),
  //             outsideTemperature: td.outsideTemperature,
  //             insideTemperature: td.insideTemperature
  //           }
  //         });
  //       //filterTemperatures(allTemperatures, page.getSelectedDateRange());
  //       const now = new Date();
  //       const hours = this.padToTwoDigits(now.getUTCHours());
  //       const minutes = this.padToTwoDigits(now.getMinutes());
  //       const seconds = this.padToTwoDigits(now.getSeconds());
  //       this.currentTime = `${hours}:${minutes}:${seconds}`;
  //       })); 

  // }

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
          timeStamp={this.state.timeStamp}
        />
        {/* <TemperatureChart data={this.allTemperatures}> </TemperatureChart> */}

      </section>
    );
  }

}
