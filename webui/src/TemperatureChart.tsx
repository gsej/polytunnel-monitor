import { FC, useState } from "react";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import styles from "./TemperatureChart.module.css";
import { TemperatureEntry } from "./state/TemperatureEntry";

interface Props {
  filteredTemperatures: TemperatureEntry[];
}

export const TemperatureChart: FC<Props> = ({ filteredTemperatures }) => {
  const options: any = {
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

  const dataTemplate = {
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

  const initialState = {
    showInside: true,
    showOutside: true,
    data: dataTemplate
  }

  const [state, setState] = useState(initialState);

  if (state.data.datasets[0].data !== filteredTemperatures) {
    const newData = JSON.parse(JSON.stringify(dataTemplate));
    newData.datasets[0].data = filteredTemperatures;
    newData.datasets[1].data = filteredTemperatures;

    setState({...state, data: newData});
  }

  function handleInsideChange(show: boolean): void {
    // const newData = JSON.parse(JSON.stringify(state.data));
    // newData.datasets[0].data = show ? filteredTemperatures : [];
    // setState({ ...state, data: newData, showInside: show });
  }

  function handleOutsideChange(show: boolean): void {
    // const newData = JSON.parse(JSON.stringify(state.data));
    // newData.datasets[1].data = show ? filteredTemperatures : [];
    // setState({ ...state, data: newData, showOutside: show });
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <Line data={state.data} options={options}></Line>
        </div>
      </div>
      <div className={styles.checkboxContainer}>
        <label htmlFor="inside">Inside</label>
        <input type="checkbox" id="inside" name="inside" value="inside" checked={state.showInside} onChange={(event) => handleInsideChange(event.target.checked)} />
        <label htmlFor="outside">Outside</label>
        <input type="checkbox" id="outside" name="outside" value="outside" checked={state.showOutside} onChange={(event) => handleOutsideChange(event.target.checked)} />
      </div>
    </div>
  );
};
