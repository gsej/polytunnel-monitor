import csv
import os
import time

class TemperatureReading:
    def __init__(self, timestamp, outside, inside):
        self.timestamp = timestamp
        self.outside = outside
        self.inside = inside
        self.difference = inside - outside

    def __iter__(self):
        yield ('timestamp', self.timestamp)
        yield ('outside', self.outside)
        yield ('inside', self.inside)
        yield ('difference', self.difference)
    
def getTemperatureDataRange(startDate, endDate, decimationFactor):
    readings = [] 

    start = time.time()

    files = os.listdir("../temperature_files")

    csvFiles = list(filter(lambda filename: filename[-4::] == ".csv", files))
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
                reading = TemperatureReading(row[0] + "Z", float(row[1]), float(row[2]))
                readings.append(reading)

    end = time.time()

    print("about to return readings. number of readings from files is ", len(readings), " time taken ", end-start)

    return readings
