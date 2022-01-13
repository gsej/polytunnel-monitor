import csv
import os
import logging
import sys

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
        if file[-4::] != ".csv":
            continue
        with open("../temperature_files/" + file) as csvDataFile:
            csvReader = csv.reader(csvDataFile)
            for row in csvReader:
                reading = TemperatureReading(row[0], float(row[1]), float(row[2]))
                readings.append(reading)
    
    readings = readings[::5]
    return readings
    
def getTemperatureDataRange(startDate, endDate):
    readings = []

    # log = logging.getLogger("TemperatureData")
    # logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(threadName)s %(name)s %(message)s")

    # console = logging.StreamHandler()
    # console.setLevel(logging.INFO)
    # log.addHandler(console)

    # if log.handlers:
    #     log.handlers.clear()

    files = os.listdir("../temperature_files")
    # log.info("count of files: " + str(len(files)))
    files.sort()

    for file in files:
        if file[-4::] != ".csv":
            continue

        dateComponent = file[0:10]

        if dateComponent < startDate or dateComponent > endDate:
            continue

        # log.info("matching file: " + file)

        with open("../temperature_files/" + file) as csvDataFile:
            csvReader = csv.reader(csvDataFile)
            for row in csvReader:
                reading = TemperatureReading(row[0], float(row[1]), float(row[2]))
                readings.append(reading)
    
    readings = readings[::5]
    return readings