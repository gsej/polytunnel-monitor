from ipaddress import ip_address
import sys
sys.path.append('modules')
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import requests
import json
from plugs import plugs

from current_temperatures import readInsideTemperature, readOutsideTemperature
from pistats import Stats
from temperature_data import getTemperatureDataRange

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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

    if inside is None:
        return jsonify(result), 500


    return jsonify(result), 200


@app.route('/api/temperaturerange/<startDate>/<endDate>/<decimationFactor>')
def temperatureDataRange(startDate, endDate, decimationFactor):
    data = getTemperatureDataRange(startDate, endDate, int(decimationFactor))
    return jsonify([ dict(reading) for reading in data])

@app.route('/api/pistatus')
def pistatus():
    stats = Stats()
    rasp_info = stats.get_stats()
    return jsonify(rasp_info)

@app.route('/api/tunnelcam')
def tunnelcamurl():

    files = os.listdir("./static/photos/")
    jpgs = list(filter(lambda x:x.endswith("jpg"), files))
    jpgs.sort(reverse = True)

    # TODO: need to fix this hack....
    latestImageUrl = "https://api.polytunnel.gsej.co.uk/static/photos/" + jpgs[0];

    result = {
        "url": latestImageUrl
    }
    return jsonify(result)

@app.route('api/plug/<plugName>', methods = ['GET', 'POST'])
def plug(plugName):

    # here we need to get the ip address of the plug......

    ip_address = plugs[plugName]

    if request.method == 'GET':
        response = requests.get(f"http://{ip_address}/cm?cmnd=Power")
    else:
        response = requests.get("http://192.168.2.6/cm?cmnd=Power%20TOGGLE")
        
    if response.text == "{ \"POWER\": \"ON\" }":
        json_response = json.loads("{ \"power\": \"On\" }")
    else:
        json_response = json.loads("{ \"power\": \"Off\" }")
    
    return json_response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
