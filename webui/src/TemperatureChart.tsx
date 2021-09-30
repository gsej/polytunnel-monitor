import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import styles from './TemperatureChart.module.css';
import { TemperatureEntry } from './TemperatureEntry';
import { RawTemperatureEntry } from './RawTemperatureEntry';

interface TemperatureChartState {
  data: any;
}

export class TemperatureChart extends React.Component<{}, TemperatureChartState> {

  state: TemperatureChartState;
  allTemperatures: TemperatureEntry[] = [];

  data = {
    datasets: [{
       label: 'Inside Temperatures',
       data:  [
         { 
           timestamp: '2021-01-01T10:00',
           insideTemperature: 10,
           outsideTemperature: 20
         },

         { 
           timestamp: '2021-01-05T10:00',
           insideTemperature: 10,
           outsideTemperature: 20
         },
         { 
           timestamp: '2021-01-07T10:00',
           insideTemperature: 10,
           outsideTemperature: 20
         }

       ],
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
    ],
  };
  
  options: any = {
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

  constructor(props: any) {
    super(props);

   // this.data.datasets[0].data = [];
    //this.data.datasets[1].data = [];

    this.state = {
      data: this.data
    }
    this.setState(this.state);
  }

  componentDidMount() {
    this.setState(this.state);
    this.getTemperatures();
  }

  getTemperatures() {
    fetch('http://api.polytunnel2.gsej.co.uk/api/temperatures')
      .then(response => response.json())
      .then(((temperatureData: RawTemperatureEntry[]) => {
        //       // TODO: integrate into state?
        this.allTemperatures = temperatureData
          .map((td: RawTemperatureEntry) => {
            return {
              timestamp: new Date(td.timestamp),
              outsideTemperature: td.outsideTemperature,
              insideTemperature: td.insideTemperature
            }
          });
      //  this.filterTemperatures(this.allTemperatures );
      }));

  }


  filterTemperatures(allTemperatures: TemperatureEntry[]) {
//    const dateRange = dateRanges.find(r => r.dateRangeId === this.state.selectedDateRange.dateRangeId);
    //        page.setHeading(dateRange.label);
    //chartManager.setDisplayFormat(dateRange.displayFormat);

    let temperaturesToShow = [...allTemperatures];

    if (allTemperatures.length > 200) {
      temperaturesToShow = temperaturesToShow.slice(0, 180);

    }
//    temperaturesToShow = allTemperatures;//.filter(dateRange.temperatureFilter);

    // const newState = {data: this.data};
    // newState.data.datasets[0].data = temperaturesToShow;
    // newState.data.datasets[1].data = temperaturesToShow;

    // console.log(JSON.stringify(newState));
    // this.setState({... newState});
//    chartManager.setData(temperaturesToShow);


}


  render() {


    // https://github.com/reactchartjs/react-chartjs-2/issues/675



    return (

      <div className={styles.chartContainer}>
        <Line data={this.state.data} options={this.options}></Line>
      </div>
    );

  }
}