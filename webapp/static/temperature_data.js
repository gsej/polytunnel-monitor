document.addEventListener('DOMContentLoaded', function () {

    const data = {
        labels: [],
        datasets: [{
            label: 'Inside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            tension: 0.1
        },
    {
            label: 'Outside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(0, 255, 0)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
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