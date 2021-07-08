import os
import time
import datetime

currentUtcTime = datetime.datetime.utcnow().isoformat()

jpgFilename = datetime.datetime.utcnow().isoformat() + ".jpg"
print("taking picture " + jpgFilename)
os.system("raspistill -o ./photos/" + jpgFilename)

print("completed")
