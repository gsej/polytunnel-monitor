import csv
import dateutil.parser

class TemperatureData:
    def __init__(self):
        self.labels = []
        self.outsideTemperatures = []
        self.insideTemperatures = []
    
    def __iter__(self):
        yield ('labels', self.labels)
        yield ('outsideTemperatures', self.outsideTemperatures)
        yield ('insideTemperatures', self.insideTemperatures)
    

def getTemperatureData():
    labels = []
    outsideTemperatures = []
    insideTemperatures = []

    with open('../temperature_files/temperatures.csv') as csvDataFile:
        csvReader = csv.reader(csvDataFile)
        for row in csvReader:
            outsideTemperatures.append(float(row[1]))
            insideTemperatures.append(float(row[2]))
#            date = dateutil.parser.parse(row[0])    
            date = row[0]
            labels.append(date)

    data = TemperatureData()
    data.labels = labels
    data.outsideTemperatures = outsideTemperatures
    data.insideTemperatures = insideTemperatures
    return data