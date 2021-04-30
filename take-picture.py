import os

import time
import datetime

while True:

   currentUtcTime = datetime.datetime.utcnow().isoformat()
   os.popen("/usr/bin/fswebcam -o" + " ./photos/image.jpg")
   time.sleep(30)
