import csv
import os
import time
import glob

class TemperatureReading:
    def __init__(self, timestamp, outside, inside):
        self.timestamp = timestamp
        self.outside = outside
        self.inside = inside

    def __iter__(self):
        yield ('timestamp', self.timestamp)
        yield ('outside', self.outside)
        yield ('inside', self.inside)

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
    
def getTemperatureDataRange(startDate, endDate, decimationFactor):
    readings = [] 

    start = time.time()

    csvFiles = glob.glob(pathname="*.csv", root_dir="../temperature_files/")
    csvFiles.sort()

    matchingFiles = list(filter(lambda filename: endDate >= filename[0:10] >= startDate, csvFiles))

    for file in matchingFiles:
        with open("../temperature_files/" + file) as csvDataFile:
            csvReader = csv.reader(csvDataFile)
            rowNumber = 0
            for row in csvReader:
                rowNumber = rowNumber + 1
                if rowNumber % decimationFactor  != 0:
                    continue
                reading = TemperatureReading(row[0], float(row[1]), float(row[2]))
                readings.append(reading)

    end = time.time()

    print("about to return readings. number of readings from files is ", len(readings), " time taken ", end-start)

    return readings