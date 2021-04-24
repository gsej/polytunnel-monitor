import sys
sys.path.append('webapp/modules')

import time
import datetime

from current_temperatures import readInsideTemperature, readOutsideTemperature

while True:
   currentUtcTime = datetime.datetime.utcnow().isoformat()
   outsideTemperature = readOutsideTemperature()
   insideTemperature = readInsideTemperature()
   line = currentUtcTime + "," + str(outsideTemperature) + "," + str(insideTemperature)

   filename = str(datetime.datetime.utcnow().date()) + ".csv"

   file = open("./temperature_files/" + filename, "a");
   file.writelines([line])
   file.close()

   print(line, flush=True)
   time.sleep(60)
