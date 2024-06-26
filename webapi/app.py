from ipaddress import ip_address
import sys
sys.path.append('modules')
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import os
import requests
import json
from datetime import datetime
from read_secrets import read_secrets;
from plugs import plugs

from current_temperatures import readInsideTemperature, readOutsideTemperature
from pistats import Stats
from temperature_data import getTemperatureDataRange

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

secrets = read_secrets()

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

@app.route('/api/focus-photo')
def focusphotourl():

    files = os.listdir("./static/focus-photo/")
    jpgs = list(filter(lambda x:x.endswith("jpg"), files))
    jpgs.sort(reverse = True)

    imageUrl = "https://api.polytunnel.gsej.co.uk/static/focus-photo/" + jpgs[0];

    result = {
        "name": jpgs[0],
        "url": imageUrl
    }
    return jsonify(result)

@app.route('/api/save-time')
def savetime():

    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    with open('./static/saved-time.txt', 'w') as f:
        f.write(current_time) 

    return "OK", 200

@app.route('/api/get-saved-time')
def getsavedtime():

    with open('./static/saved-time.txt') as f:
        content = f.read()

    result = {
        "time": content,
    }
    return jsonify(result)

@app.route('/api/plug/<plugName>', methods = ['GET', 'POST'])
def plug(plugName):

    # here we need to get the ip address of the plug......
    
    if plugName in plugs:
        ip_address = plugs[plugName]
    else:
        return "NotFound", 404

    if request.method == 'GET':
        response = requests.get(f"http://{ip_address}/cm?cmnd=Power")
    else:
        if request.headers["X-Api-Key"] != secrets["API_KEY"]:
           return "Unauthorised", 401 
        response = requests.get("http://192.168.2.6/cm?cmnd=Power%20TOGGLE")
        
    if response.text.find("ON"):
        json_response = json.loads("{ \"powerOn\": true }")
    else:
        json_response = json.loads("{ \"powerOn\": false }")
    
    return json_response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
