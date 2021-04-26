import sys
sys.path.append('modules')
import json
from flask import Flask, render_template, jsonify


from current_temperatures import readInsideTemperature, readOutsideTemperature
from pistats import Stats
from temperature_data import getTemperatureData

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/current')
def current():
    inside = readInsideTemperature();
    insideTemperature = "Unavailable" if inside is None else "%.1f" % inside;

    outside = readOutsideTemperature()
    outsideTemperature = "Unavailable" if outside is None else "%.1f" % outside

    return render_template('current.html', insideTemperature=insideTemperature, outsideTemperature=outsideTemperature)

@app.route('/pi')
def pi():
    stats = Stats()
    rasp_info = stats.get_stats()
    return render_template('pi.html', stats = rasp_info)

@app.route('/temperatures')
def temperatures():
    return render_template('temperatures.html')

@app.route('/api/temperatures')
def temperatureData():
    # this is an api endpoint to return temperature data
    
    data = getTemperatureData()
    return jsonify([ dict(reading) for reading in data])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
