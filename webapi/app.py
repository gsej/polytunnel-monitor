import sys
sys.path.append('modules')
import json
from flask import Flask, render_template, redirect, url_for, jsonify
from flask_cors import CORS, cross_origin
import os

from current_temperatures import readInsideTemperature, readOutsideTemperature
from pistats import Stats
from temperature_data import getTemperatureData

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/')
def index():
    return redirect(url_for('temperatures'))

@app.route('/pi')
def pi():
    stats = Stats()
    rasp_info = stats.get_stats()
    return render_template('pi.html', stats = rasp_info)

@app.route('/temperatures')
def temperatures():
    inside = readInsideTemperature();
    insideTemperature = "Unavailable" if inside is None else "%.1f" % inside;
    outside = readOutsideTemperature()
    outsideTemperature = "Unavailable" if outside is None else "%.1f" % outside
    return render_template('temperatures.html', insideTemperature=insideTemperature, outsideTemperature=outsideTemperature)

@app.route('/tunnelcam')
def tunnelcam():

    files = os.listdir("./static/photos/")
    jpgs = list(filter(lambda x:x.endswith("jpg"), files))
    jpgs.sort(reverse = True)

    latestImageUrl = url_for("static", filename="photos/" + jpgs[0])

    return render_template('tunnelcam.html', latestImageUrl=latestImageUrl)

@app.route('/api/currenttemperatures')
@cross_origin()
def currentTemperatures():
    inside = readInsideTemperature();
    insideTemperature = "Unavailable" if inside is None else "%.1f" % inside;

    outside = readOutsideTemperature()
    outsideTemperature = "Unavailable" if outside is None else "%.1f" % outside

    result = { 
        "insideTemperature": insideTemperature,
        "outsideTemperature": outsideTemperature,        
    }
    return jsonify(result)



@app.route('/api/temperatures')
def temperatureData():
    # this is an api endpoint to return temperature data
    
    data = getTemperatureData()
    return jsonify([ dict(reading) for reading in data])

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
