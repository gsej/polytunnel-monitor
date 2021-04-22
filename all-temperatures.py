import os                                                  # import os module
import time                                                # import time module
import datetime

os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
os.system('modprobe w1-therm')                                                 

# use fixed list of devices, so we can always be sure of the order of the output
# the devices are:
# Outdoors: /sys/bus/w1/devices/28-3c01d075ef09
# Indoors: /sys/bus/w1/devices/28-3c01d075334f
#
#
device_folders = ['/sys/bus/w1/devices/28-3c01d075ef09', '/sys/bus/w1/devices/28-3c01d075334f']

def read_temp_raw(device_folder):
   device_file = device_folder + '/w1_slave'
   f = open(device_file, 'r')
   lines = f.readlines()                                   # read the device details
   f.close()
   return lines

def read_temp(device_folder):
   lines = read_temp_raw(device_folder)
   while lines[0].strip()[-3:] != 'YES':                   # ignore first line
      time.sleep(0.2)
      lines = read_temp_raw(device_folder)
   equals_pos = lines[1].find('t=')                        # find temperature in the details
   if equals_pos != -1:
      temp_string = lines[1][equals_pos+2:]
      temp_c = float(temp_string) / 1000.0                 # convert to Celsius
      return temp_c

while True:
   currentUtcTime = datetime.datetime.utcnow().isoformat()
   temperature1 = read_temp(device_folders[0])
   temperature2 = read_temp(device_folders[1])

   line = currentUtcTime + "," + str(temperature1) + "," + str(temperature2)
   print(line, flush=True)                                      # Print temperature    
   time.sleep(60)
