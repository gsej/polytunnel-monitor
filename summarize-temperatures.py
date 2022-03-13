import pandas as pd
import os

def summarizeFile(filename):
	df = pd.read_csv(filename)
	numberOfRows = len(df.index)
	outside = df.iloc[:, 1]
	outsideMin = outside.min()
	outsideMean = outside.mean()
	outsideMax = outside.max()

	return (numberOfRows, outsideMin, outsideMean, outsideMax)


summary = pd.DataFrame(columns=['date', 'number_of_rows', 'outside_min', 'outside_mean', 'outside_max'])

files = os.listdir("temperature_files")
csvFiles = list(filter(lambda filename: filename[-4::] == ".csv", files))
csvFiles.sort()

for file in csvFiles:
	date = file[:10]
	(numberOfRows, outsideMin, outsideMean, outsideMax) = summarizeFile("temperature_files/" + file)
	summary.loc[len(summary.index)] = [date, numberOfRows, str(round(outsideMin, 1)), str(round(outsideMean, 1)), str(round(outsideMax, 1))]

print (summary.to_csv(index=False))




