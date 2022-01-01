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

  const [data, setData] = useState(dataTemplate);

  if (data.datasets[0].data !== filteredTemperatures) {
    const newData = JSON.parse(JSON.stringify(dataTemplate));
    newData.datasets[0].data = filteredTemperatures;
    newData.datasets[1].data = filteredTemperatures;

    setData(newData);
  }

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};
