document.addEventListener('DOMContentLoaded', function () {

    Chart.defaults.elements.point.radius = 0;

    const data = {
        datasets: [{
            label: 'Inside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            tension: 0,
            spanGaps: 1000 * 60 * 10, // span gaps up to a max of 10 mins, I think
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'insideTemperature'
            }
        },
        {
            label: 'Outside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            borderWidth: 2,
            tension: 0,
            spanGaps: 1000 * 60 * 10, // span gaps up to a max of 10 mins, I think
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'outsideTemperature'
            }
        }],
    }

const config = {
    type: 'line',
    data: data, options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        hour: 'HH mm'
                    }
                },
                ticks: {
                    minRotation: 90,
                    source: 'auto'
                }
            }
        }
    }
};

const chart = new Chart(
    document.getElementById('chart'),
    config
);

fetch('api/temperatures')
    .then(response => response.json())
    .then(temperatureData => {
        console.log(temperatureData);

        data.datasets[0].data = temperatureData;
        data.datasets[1].data = temperatureData;

        chart.update();


    });

}, false);