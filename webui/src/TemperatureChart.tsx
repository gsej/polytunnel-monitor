import React from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import styles from "./TemperatureChart.module.css";
import { TemperatureEntry } from "./state/TemperatureEntry";

interface Props {
  filteredTemperatures: TemperatureEntry[];
}

export class TemperatureChart extends React.Component<Props, any> {
  dataTemplate: any;

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

    this.dataTemplate = {
      datasets: [
        {
          label: "Inside Temperatures",
          data: [],
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
          data: [],
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

    const state = this.getNewState(this.dataTemplate, props.filteredTemperatures);
    this.state = state;
  }

  getNewState(dataTemplate: any, filteredTemperatures: TemperatureEntry[]) {
    const state = JSON.parse(JSON.stringify(dataTemplate));
    state.datasets[0].data = filteredTemperatures;
    state.datasets[1].data = filteredTemperatures;
    return state;
  }

  componentDidUpdate(previousProps: any) {
    if (previousProps.filteredTemperatures !== this.props.filteredTemperatures) {
      const state = this.getNewState(this.dataTemplate, this.props.filteredTemperatures);
      this.setState(state);
    }
  }

  render = () => {
    const data: any = this.state;
    return (
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <Line data={data} options={this.options}></Line>
        </div>
      </div>
    );
  };
}
