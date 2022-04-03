import os
import time
import datetime

currentUtcTime = datetime.datetime.utcnow().isoformat()

jpgFilename = datetime.datetime.utcnow().isoformat() + "Z.jpg"
print("taking picture " + jpgFilename)
os.system("libcamera-still --hflip --vflip -o ./photos/" + jpgFilename)

print("completed")
