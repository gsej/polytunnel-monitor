import React from 'react';

export class TemperatureChart extends React.Component {

  data: any;
  config: any;


  constructor(props: any) {

    super(props);

    Chart.defaults.elements.point.radius = 1;

    this.data = {
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

    this.config = {
        type: 'line',

        data: this.data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom"
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
    };

    this.chart = new Chart(element, this.config);
  }

  render() {

    return (
      <div>
      <script src="static/vendor/chart.min.js"
  integrity="sha512-BqNYFBAzGfZDnIWSAEGZSD/QFKeVxms2dIBPfw11gZubWwKUjEgmFUtUls8vZ6xTRZN/jaXGHD/ZaxD9+fDo0A=="
  crossorigin="anonymous"></script>
      <canvas id="chart" />
      </div>
    );
  }

}