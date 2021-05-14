
class ChartManager {

    constructor(element) {
        Chart.defaults.elements.point.radius = 0;

        this.data = {
            datasets: [{
                label: 'Inside Temperatures',
                data: [],
                fill: false,
                borderColor: 'rgb(255, 0, 0)',
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
                borderColor: 'rgb(0, 255, 0)',
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

    setDisplayFormat(displayFormat) {
        this.config.options.scales.x.time.displayFormats.hour = displayFormat;
    }

    setData(temperaturesToShow) {
        this.data.datasets[0].data = this.data.datasets[1].data = temperaturesToShow;
        this.chart.update();
    }
}

function setHeading(title) {
    const heading = document.getElementsByTagName("h1")[0];
    heading.textContent = title;
}

function getDateRanges() {
    const dateRanges = [
        {
            key: "last24",
            label: "Last 24 hours",
            displayFormat: "HH mm"
        },
        {
            key: "today",
            label: "Today",
            displayFormat: "HH mm"
        },
        {
            key: "lastweek",
            label: "Last Week",
            displayFormat: "dd MMM HH mm"
        },
        {
            key: "all",
            label: "All",
            displayFormat: "dd MMM HH mm"
        },
    ];

    return dateRanges;

}

document.addEventListener('DOMContentLoaded', function () {

    let allTemperatures;

    let defaultSelectedDateRange = "all";


    getSelectedDateRange = () => {
        let selectedDateRange = window.localStorage.getItem("selectedDateRange");

        if (!selectedDateRange) {
            setSelectedDateRange(defaultSelectedDateRange);
            return defaultSelectedDateRange;
        }

        return selectedDateRange;
    };

    setSelectedDateRange = (value) => {
        window.localStorage.setItem("selectedDateRange", value);
    }

    const chartManager = new ChartManager(document.getElementById('chart'));

    const dateRanges = getDateRanges();

    const tabContainer = document.getElementById("tab-container");
    for (let dateRange of dateRanges) {
        let radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("name", "tab");
        radioButton.setAttribute("value", dateRange.key);
        radioButton.setAttribute("id", dateRange.key);

        if (dateRange.key === getSelectedDateRange()) {
            radioButton.setAttribute("checked", true);
            radioButton.setAttribute("autofocus", true);
        }

        radioButton.addEventListener("change", (e) => {
            setSelectedDateRange(e.target.value);
            setTimeout(() => filterTemperatures(), 0);
        });

        tabContainer.appendChild(radioButton);

        let label = document.createElement("label");
        label.setAttribute("for", dateRange.key);
        label.setAttribute("class", "tab-label");
        label.textContent = dateRange.label;
        tabContainer.appendChild(label);
    }

    filterTemperatures = () => {
        let temperaturesToShow;

        dateRange = dateRanges.find(r => r.key === getSelectedDateRange());
        setHeading(dateRange.label);
        chartManager.setDisplayFormat(dateRange.displayFormat);

        if (dateRange.key === "all") {
            temperaturesToShow = allTemperatures;
        }
        else if (dateRange.key === "last24") {
            const now = new Date();
            const dayAgo = new Date();
            dayAgo.setHours(dayAgo.getHours() - 24);
            temperaturesToShow = allTemperatures.filter(t => t.timestamp >= dayAgo && t.timestamp <= now);
        }
        else if (dateRange.key === "today") {
            const today = new Date();
            const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
            temperaturesToShow = allTemperatures.filter(t => t.timestamp >= startOfDay && t.timestamp <= endOfDay);
        }
        else if (dateRange.key === "lastweek") {
            const now = new Date();
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            temperaturesToShow = allTemperatures.filter(t => t.timestamp >= weekAgo && t.timestamp <= now);
        }

        chartManager.setData(temperaturesToShow);
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
