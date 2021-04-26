from collections import namedtuple
import csv
import os
import dateutil.parser


class TemperatureReading:
    def __init__(self, timestamp, outsideTemperature, insideTemperature):
        self.timestamp = timestamp
        self.outsideTemperature = outsideTemperature
        self.insideTemperature = insideTemperature

    def __iter__(self):
        yield ('timestamp', self.timestamp)
        yield ('outsideTemperature', self.outsideTemperature)
        yield ('insideTemperature', self.insideTemperature)

def getTemperatureData():
    readings = []

    files = os.listdir("../temperature_files")
    files.sort()

    for file in files:
        with open("../temperature_files/" + file) as csvDataFile:
            csvReader = csv.reader(csvDataFile)
            for row in csvReader:
                reading = TemperatureReading(row[0], float(row[1]), float(row[2]))
                readings.append(reading)

    return readings