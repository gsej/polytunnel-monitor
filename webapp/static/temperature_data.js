document.addEventListener('DOMContentLoaded', function () {

    Chart.defaults.elements.point.radius = 0;

    let allTemperatures;
    let dateRange = "all";

    const data = {
        datasets: [{
            label: 'Inside Temperatures',
            data: [],
            fill: false,
            borderColor: 'rgb(255, 0, 0)',
            borderWidth: 2,
            tension: 0,
            //spanGaps: 1000 * 60 * 10, // span gaps up to a max of 10 mins, I think
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
            //spanGaps: 1000 * 60 * 10, // so that if we don't have any points for 10 mins, a gap is shown
            parsing: {
                xAxisKey: 'timestamp',
                yAxisKey: 'outsideTemperature'
            }
        }],
    }

    const config = {
        type: 'line',
        data: data,
        options: {
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

    const chart = new Chart(
        document.getElementById('chart'),
        config
    );

    const select = document.getElementById('dateRange');
    select.addEventListener('change', (event) => {
        dateRange = event.target.value;
        setTimeout(() => filterTemperatures(), 0);
    });

    filterTemperatures = () => {
        let temperaturesToShow;

        if (dateRange === "all") {
            temperaturesToShow = allTemperatures;
        }
        else if (dateRange === "last24") {
            const now = new Date();
            // TODO: switch the data structure to use dates instead of strings so that ranges can be better expressed.

        }
        else if (dateRange === "today") {
            const today = new Date().toISOString().substr(0, 10);

            let s = performance.now();
            temperaturesToShow = allTemperatures.filter(t => t.timestamp.substr(0, 10) === today);
            let f = performance.now();

            console.log(`filtering took ${f - s}ms`)
        }
        data.datasets[0].data = temperaturesToShow;
        data.datasets[1].data = temperaturesToShow;

        chart.update();
    }

    fetch('api/temperatures')
        .then(response => response.json())
        .then(temperatureData => {
            allTemperatures = temperatureData;
            filterTemperatures();
        });

}, false);