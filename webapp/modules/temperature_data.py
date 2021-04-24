

class TemperatureData:
    def __init__(self):
        self.labels = []
        self.insideTemperatures = []
    
    def __iter__(self):
        yield ('labels', self.labels)
        yield ('insideTemperatures', self.insideTemperatures)

    

def getTemperatureData():
    data = TemperatureData()
    data.labels = ['Jan', 'Feb', 'March', 'April','May', 'June', 'July']
    data.insideTemperatures = [65, 59, 80, 81, 56, 55, 40]
    return data


    # labels = [];
    # outsideTemperatures = [];
    # insideTemperatures = [];

    # i = 0
    # with open('../temperature_files/temperatures.csv') as csvDataFile:
    #     csvReader = csv.reader(csvDataFile)
    #     for row in csvReader:
    #         outsideTemperatures.append(float(row[1]))
    #         insideTemperatures.append(float(row[2]))
    #         date = dateutil.parser.parse(row[0])
    #         print (date.minute)
    #         #if (date.minute == 0.0):
    #         label = str(date.hour) + ":" + str(date.minute)
    #         labels.append(label)
    #         #else:
    #         #    labels.append("")
    #         i = i + 1


