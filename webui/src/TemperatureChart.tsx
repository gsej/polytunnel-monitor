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
    allData: [],
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
    data: dataTemplate,
  };

  var [state, setState] = useState(initialState);

  function handleInsideChange(show: boolean): void {
    if (show && !state.showInside) {
      const newData = JSON.parse(JSON.stringify(dataTemplate));
      newData.allData = filteredTemperatures;

      if (show) {
        newData.datasets[0].data = filteredTemperatures;
      } else {
        newData.datasets[0].data = [];
      }

      if (state.showOutside) {
        newData.datasets[1].data = filteredTemperatures;
      } else {
        newData.datasets[1].data = [];
      }
      setState({ ...state, data: newData, showInside: show });
    } else if (!show && state.showInside) {
      const newData = JSON.parse(JSON.stringify(state.data));
      newData.allData = filteredTemperatures;
      if (show) {
        newData.datasets[0].data = filteredTemperatures;
      } else {
        newData.datasets[0].data = [];
      }

      if (state.showOutside) {
        newData.datasets[1].data = filteredTemperatures;
      } else {
        newData.datasets[1].data = [];
      }
      setState({ ...state, data: newData, showInside: show });
    }
  }

  if (state.data.allData !== filteredTemperatures) {
    const newData = JSON.parse(JSON.stringify(dataTemplate));
    newData.allData = filteredTemperatures;
    newData.datasets[0].data = filteredTemperatures;
    newData.datasets[1].data = filteredTemperatures;

    setState({ ...state, data: newData });
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
        <input type="checkbox" id="inside" name="inside" value="inside" checked={state.showInside} onChange={(ev) => handleInsideChange(ev.target.checked)} />
        <label htmlFor="outside">Outside</label>
        <input type="checkbox" id="outside" name="outside" value="outside" checked={state.showOutside} onChange={(ev) => setState({ ...state, showOutside: ev.target.checked })} />
      </div>
    </div>
  );
};
