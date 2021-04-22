from flask import Flask, render_template
import os
import glob

from temperatures import readInsideTemperature, readOutsideTemperature

app = Flask(__name__)

@app.route('/')
def index():
    return """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Polytunnel PI</title>
</head>
<body>
    hello from pi4
</body>
</html>"""

@app.route('/hello')
def sayHello():
    return hello();

@app.route('/current')
def current():
    insideTemperature = readInsideTemperature()
    outsideTemperature = readOutsideTemperature()
    return render_template('current.html', insideTemperature=insideTemperature, outsideTemperature=outsideTemperature)


def read_temp_raw():
   f = open(device_file, 'r')
   lines = f.readlines()                                   # read the device details
   f.close()
   return lines

def read_temp():
   lines = read_temp_raw()
   while lines[0].strip()[-3:] != 'YES':                   # ignore first line
      time.sleep(0.2)
      lines = read_temp_raw()
   equals_pos = lines[1].find('t=')                        # find temperature in the details
   if equals_pos != -1:
      temp_string = lines[1][equals_pos+2:]
      temp_c = float(temp_string) / 1000.0                 # convert to Celsius
      return temp_c


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
