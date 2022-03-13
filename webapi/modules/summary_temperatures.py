import csv
import os
import time

class TemperatureSummary:
    def __init__(self, date, number_of_rows, outside_min, outside_mean, outside_max):
        self.date = date
        self.number_of_rows = number_of_rows
        self.outside_min = outside_min
        self.outside_mean = outside_mean
        self.outside_max = outside_max

    def __iter__(self):
        yield ('date', self.date)
        yield ('number_of_rows', self.number_of_rows)
        yield ('outside_min', self.outside_min)
        yield ('outside_mean', self.outside_mean)
        yield ('outside_max', self.outside_max)
    
def getSummaryTemperatures():
    readings = [] 

    file = "../summary_files/summary_temperatures.csv"

    with open(file) as csvDataFile:
        csvReader = csv.reader(csvDataFile)
        firstRow = True
        for row in csvReader:
            if firstRow == True:
                firstRow = False
                continue
            if len(row) < 5:
                continue
            reading = TemperatureSummary(row[0], int(row[1]), float(row[2]), float(row[3]), float(row[4]))
            readings.append(reading)

    return readings