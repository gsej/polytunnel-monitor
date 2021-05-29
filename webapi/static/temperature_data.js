"use strict";

class ChartManager {

    constructor(element) {
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

    setDisplayFormat(displayFormat) {
        this.config.options.scales.x.time.displayFormats.hour = displayFormat;
    }

    setData(temperaturesToShow) {
        this.data.datasets[0].data = this.data.datasets[1].data = temperaturesToShow;
        this.chart.update();
    }
}

class Page {
    setHeading(title) {
        const heading = document.getElementsByTagName("h1")[0];
        heading.textContent = title;
    }

    setSelectedDateRange(value) {
        window.localStorage.setItem("selectedDateRange", value);
    }

    getSelectedDateRange() {
        let defaultSelectedDateRange = "all";
        let selectedDateRange = window.localStorage.getItem("selectedDateRange");

        if (!selectedDateRange) {
            this.setSelectedDateRange(defaultSelectedDateRange);
            return defaultSelectedDateRange;
        }

        return selectedDateRange;
    }
}

function getDateRanges() {
    const dateRanges = [
        {
            key: "last24",
            label: "Last 24 hours",
            displayFormat: "HH mm",
            temperatureFilter: t => {
                const now = new Date();
                const dayAgo = new Date();
                dayAgo.setHours(dayAgo.getHours() - 24);
                return t.timestamp >= dayAgo && t.timestamp <= now;
            }
        },
        {
            key: "today",
            label: "Today",
            displayFormat: "HH mm",
            temperatureFilter: t => {
                const today = new Date();
                const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
                return t.timestamp >= startOfDay && t.timestamp <= endOfDay;
            }
        },
        {
            key: "lastweek",
            label: "Last Week",
            displayFormat: "dd MMM HH mm",
            temperatureFilter: t => {
                const now = new Date();
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return t.timestamp >= weekAgo && t.timestamp <= now;
            }
        },
        {
            key: "all",
            label: "All",
            displayFormat: "dd MMM HH mm",
            temperatureFilter: t => true
        },
    ];

    return dateRanges;
}

function padToTwoDigits(number) {
    if (number > 9) {
        return "" + number;
    }
    else {
        return "0" + number;
    }
}


document.addEventListener('DOMContentLoaded', function () {

    let allTemperatures;

    const page = new Page();

    const filterTemperatures = (allTemperatures, selectedDateRange) => {
        const dateRange = dateRanges.find(r => r.key === selectedDateRange);
        page.setHeading(dateRange.label);
        chartManager.setDisplayFormat(dateRange.displayFormat);
        let temperaturesToShow = allTemperatures.filter(dateRange.temperatureFilter);
        chartManager.setData(temperaturesToShow);
    }

    const chartManager = new ChartManager(document.getElementById('chart'));
    const dateRanges = getDateRanges();


    // add event listeners.

    const tabContainer = document.getElementById("tab-container");
    for (let dateRange of dateRanges) {
        let radioButton = document.createElement("input");
        radioButton.setAttribute("type", "radio");
        radioButton.setAttribute("name", "tab");
        radioButton.setAttribute("value", dateRange.key);
        radioButton.setAttribute("id", dateRange.key);

        if (dateRange.key === page.getSelectedDateRange()) {
            radioButton.setAttribute("checked", true);
            radioButton.setAttribute("autofocus", true);
        }

        radioButton.addEventListener("change", (e) => {
            page.setSelectedDateRange(e.target.value);
            setTimeout(() => filterTemperatures(allTemperatures, page.getSelectedDateRange()), 0);
        });

        tabContainer.appendChild(radioButton);

        let label = document.createElement("label");
        label.setAttribute("for", dateRange.key);
        label.setAttribute("class", "tab-label");
        label.textContent = dateRange.label;
        tabContainer.appendChild(label);
    }

    function getTemperatures() {
        fetch('api/currenttemperatures')
            .then(response => response.json())
            .then(currentTemperatures => {
                document.getElementById("insideTemperature").textContent = currentTemperatures.insideTemperature;
                document.getElementById("outsideTemperature").textContent = currentTemperatures.outsideTemperature;
                document.getElementById("relativeHumidity").textContent = currentTemperatures.relativeHumidity;
                document.getElementById("altInsideTemperature").textContent = currentTemperatures.altInsideTemperature;
            });

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
                filterTemperatures(allTemperatures, page.getSelectedDateRange());

                const now = new Date();
                const hours = padToTwoDigits(now.getUTCHours());
                const minutes = padToTwoDigits(now.getMinutes());
                const seconds = padToTwoDigits(now.getSeconds());
                document.getElementById("time").textContent = `${hours}:${minutes}:${seconds}`
            });

    }

    getTemperatures();

    setInterval(() => {
        getTemperatures();
    }, 10000)


}, false);
