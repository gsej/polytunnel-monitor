from flask import Flask, render_template
import csv
#import os
#import glob

import dateutil.parser

from temperatures import readInsideTemperature, readOutsideTemperature

from pistats import Stats

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello')
def sayHello():
    return hello();

@app.route('/current')
def current():
    insideTemperature = "%.1f" % readInsideTemperature()
    outsideTemperature = "%.1f" % readOutsideTemperature()
    return render_template('current.html', insideTemperature=insideTemperature, outsideTemperature=outsideTemperature)

@app.route('/pi')
def pi():
    stats = Stats()
    rasp_info = stats.get_stats()
    return render_template('pi.html', stats = rasp_info)

@app.route('/temperatures')
def temperatures():

    labels = [];
    outsideTemperatures = [];
    insideTemperatures = [];

    i = 0
    with open('temperatures.csv') as csvDataFile:
        csvReader = csv.reader(csvDataFile)
        for row in csvReader:
            outsideTemperatures.append(float(row[1]))
            insideTemperatures.append(float(row[2]))
            date = dateutil.parser.parse(row[0])
            print (date.minute)
            #if (date.minute == 0.0):
            label = str(date.hour) + ":" + str(date.minute)
            labels.append(label)
            #else:
            #    labels.append("")
            i = i + 1


    # labels = [
    #     'JAN', 'FEB', 'MAR', 'APR',
    #     'MAY', 'JUN', 'JUL', 'AUG',
    #     'SEP', 'OCT', 'NOV', 'DEC'
    # ]

    # values = [
    #     967.67, 1190.89, 1079.75, 1349.19,
    #     2328.91, 2504.28, 2873.83, 4764.87,
    #     4349.29, 6458.30, 9907, 16297
    # ]

    maxValue = max(max(insideTemperatures), max(outsideTemperatures))

    return render_template('temperatures.html', title='Temperatures', max=maxValue, labels=labels, outsideTemperatures=outsideTemperatures, insideTemperatures=insideTemperatures)

    #return render_template('temperatures.html', temps=t)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
