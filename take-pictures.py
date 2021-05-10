import os
import time
import datetime

currentUtcTime = datetime.datetime.utcnow().isoformat()

filename = datetime.datetime.utcnow().isoformat() + ".jpg"

print("taking picture " + filename)

os.system("raspistill -o ./webapp/static/photos/" + filename)

print("completed")
