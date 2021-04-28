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
            responsive: true,
            maintainAspectRatio: false,
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
            const dayAgo = new Date();
            dayAgo.setHours(dayAgo.getHours() - 24);

            let s = performance.now();
            temperaturesToShow = allTemperatures.filter(t => t.timestamp >= dayAgo && t.timestamp <= now);
            let f = performance.now();

            console.log(`filtering took ${f - s}ms`)
        }
        else if (dateRange === "today") {
            const today = new Date();

            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

            let s = performance.now();
            temperaturesToShow = allTemperatures.filter(t => t.timestamp >= startOfDay && t.timestamp <= endOfDay);
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
            allTemperatures = temperatureData
                .map(td => {
                    return {
                        timestamp: new Date(td.timestamp),
                        outsideTemperature: td.outsideTemperature,
                        insideTemperature: td.insideTemperature
                    }
                });
            filterTemperatures();
        });

}, false);