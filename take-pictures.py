#!/usr/bin/env python
import os
import time
import datetime

currentUtcTime = datetime.datetime.utcnow().isoformat()

jpgFilename = datetime.datetime.utcnow().isoformat() + "Z.jpg"
print("taking picture " + jpgFilename)
os.system("libcamera-jpeg --tuning-file /usr/share/libcamera/ipa/rpi/vc4/imx477_af.json --autofocus-mode manual --lens-position 3.0 --o ./photos/" + jpgFilename)
#os.system("libcamera-jpeg --tuning-file /usr/share/libcamera/ipa/rpi/vc4/imx477_af.json --autofocus-mode manual --lens-position 0.0 --hflip --vflip -o ./photos/" + jpgFilename)

print("completed")
