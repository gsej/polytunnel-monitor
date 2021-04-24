document.addEventListener('DOMContentLoaded', function () {

    Chart.defaults.elements.point.radius = 0;

    const data = {
        labels: [],
        datasets: [{
            label: 'Inside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            tension: 0,
            spanGaps: 1000 * 60 * 10 // span gaps up to a max of 10 mins, I think
        },
        {
            label: 'Outside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            borderWidth: 2,
            tension: 0,
            spanGaps: 1000 * 60 * 10 // span gaps up to a max of 10 mins, I think
        }]
    };

    const config = {
        type: 'line',
        data: data, options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
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

            data.labels = temperatureData.labels;
            data.datasets[0].data = temperatureData.insideTemperatures;
            data.datasets[1].data = temperatureData.outsideTemperatures;

            chart.update();


        });









}, false);