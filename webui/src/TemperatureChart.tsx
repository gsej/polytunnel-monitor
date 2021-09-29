import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
//import { Chart, registerables } from 'chart.js';
import styles from './TemperatureChart.module.css';

export function TemperatureChart(props: any) {

  //Chart.register(...registerables);

  //Chart.defaults.elem0ents.point.radius = 1;

  const data = {
    datasets: [{
      label: 'Inside Temperatures',
      data: [],
      fill: false,
      borderColor: 'firebrick',
      borderWidth: 2,
      tension: 0,
      spanGaps: 1000 * 60 * 35, // I don't know what this number represents.
      parsing: {
        xAxisKey: 'timestamp',
        yAxisKey: 'insideTemperature'
      }
    },
    {
      label: 'Outside Temperatures',
      data: [],
      fill: false,
      borderColor: 'green',
      borderWidth: 2,
      tension: 0,
      spanGaps: 1000 * 60 * 35,
      parsing: {
        xAxisKey: 'timestamp',
        yAxisKey: 'outsideTemperature'
      }
    }],
  }


  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    scales: {
      x: {
        weight: 0,
        type: 'time',
        position: 'bottom',
        time: {
          displayFormats: {
            hour: 'dd MMM HH mm',
          }
        },
        ticks: {
          minRotation: 90,
          source: 'auto'
        }
      },
    }
  }

  // const config: any = {
  //   type: 'line',
  //   data: data,
  //   options: options
  // }

  //let chart : Chart;

  // setTimeout(() => {
  //   console.log("creating chart");
  //   const element = document.getElementById('chart');

  //   if (!chart && element) {
  //     chart = new Chart(element, config);
  //   }
  //   else {
  //     //chart.update();
  //   }
  // }, 10);


  return (
    <div className={styles.chartContainer}>      
      <Line data={data} options={options}></Line>
    </div>
  );

}