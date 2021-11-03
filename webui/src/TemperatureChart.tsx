import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import styles from "./TemperatureChart.module.css";
import { TemperatureEntry } from "./state/TemperatureEntry";

interface Props {
  allTemperatures: TemperatureEntry[];
}

export class TemperatureChart extends React.Component<Props> {
  data: any;

  options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        weight: 0,
        type: "time",
        position: "bottom",
        time: {
          displayFormats: {
            hour: "dd MMM HH mm",
          },
        },
        ticks: {
          minRotation: 90,
          source: "auto",
        },
      },
    },
  };

  constructor(props: Props) {
    super(props);

    this.data = {
      datasets: [
        {
          label: "Inside Temperatures",
          data: props.allTemperatures,
          fill: false,
          borderColor: "firebrick",
          borderWidth: 2,
          pointRadius: 1,
          tension: 0,
          spanGaps: 1000 * 60 * 35, // I don't know what this number represents.
          parsing: {
            xAxisKey: "timestamp",
            yAxisKey: "insideTemperature",
          },
        },
        {
          label: "Outside Temperatures",
          data: props.allTemperatures,
          fill: false,
          borderColor: "green",
          borderWidth: 2,
          pointRadius: 1,
          tension: 0,
          spanGaps: 1000 * 60 * 35,
          parsing: {
            xAxisKey: "timestamp",
            yAxisKey: "outsideTemperature",
          },
        },
      ],
    };

    //  this.state = {
    //   data: this.data,
    // };
    //this.setState(this.state);
  }

  //   componentDidMount() {
  // //    this.setState(this.state);
  //  //   this.getTemperatures();
  //   }

  // getTemperatures() {
  //   fetch('http://api.polytunnel2.gsej.co.uk/api/temperatures')
  //     .then(response => response.json())
  //     .then(((temperatureData: RawTemperatureEntry[]) => {
  //       //       // TODO: integrate into state?
  //       this.allTemperatures = temperatureData
  //         .map((td: RawTemperatureEntry) => {
  //           return {
  //             timestamp: new Date(td.timestamp),
  //             outsideTemperature: td.outsideTemperature,
  //             insideTemperature: td.insideTemperature
  //           }
  //         });
  //       this.filterTemperatures(this.allTemperatures);
  //     }));
  // }

  // filterTemperatures(allTemperatures: TemperatureEntry[]) {
  //   //    const dateRange = dateRanges.find(r => r.dateRangeId === this.state.selectedDateRange.dateRangeId);
  //   //        page.setHeading(dateRange.label);
  //   //chartManager.setDisplayFormat(dateRange.displayFormat);

  //   //    let temperaturesToShow = [...allTemperatures];

  //   //    if (allTemperatures.length > 200) {
  //   //     temperaturesToShow = temperaturesToShow.slice(0, 180);

  //   //    }
  //   //    temperaturesToShow = allTemperatures;//.filter(dateRange.temperatureFilter);

  //   const newState = {
  //     data: {
  //       datasets: Array<any>(),
  //     },
  //   };

  //   newState.data.datasets.push(this.state.data.datasets[0]);

  //   newState.data.datasets[0].data = [
  //     {
  //       timestamp: "2021-01-01T10:00",
  //       insideTemperature: 15,
  //       outsideTemperature: 20,
  //     },

  //     {
  //       timestamp: "2021-01-05T10:00",
  //       insideTemperature: 16,
  //       outsideTemperature: 20,
  //     },
  //     {
  //       timestamp: "2021-01-07T10:00",
  //       insideTemperature: 17,
  //       outsideTemperature: 20,
  //     },
  //     {
  //       timestamp: "2021-01-08T10:00",
  //       insideTemperature: 19,
  //       outsideTemperature: 20,
  //     },
  //   ];

  //   // newState.data.datasets[0].data = temperaturesToShow;
  //   // newState.data.datasets[1].data = temperaturesToShow;

  //   // console.log(JSON.stringify(newState));
  //   this.setState(newState);

  //   //    chartManager.setData(temperaturesToShow);
  // }

  render() {
    // https://github.com/reactchartjs/react-chartjs-2/issues/675

    return (
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <Line data={this.data} options={this.options}></Line>
        </div>
      </div>
    );
  }
}
