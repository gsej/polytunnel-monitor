import os                                                  # import os module
import time                                                # import time module
import datetime

os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
os.system('modprobe w1-therm')                                                 

# use fixed list device filenames,  so we can always be sure of the order of the output
outsideProbe = '/sys/bus/w1/devices/28-3c01d075ef09/w1_slave'
insideProbe = '/sys/bus/w1/devices/28-3c01d075334f/w1_slave'


def readInsideTemperature():
   if (device_present(insideProbe)):
      return read_temp(insideProbe)
   else:
      return None

def readOutsideTemperature():
   if (device_present(outsideProbe)):
      return read_temp(outsideProbe)
   else:
      return None

def read_temp_raw(device_file):
   f = open(device_file, 'r')
   lines = f.readlines()                                   # read the device details
   f.close()
   return lines

def read_temp(device_file):
   lines = read_temp_raw(device_file)
   while lines[0].strip()[-3:] != 'YES':                   # ignore first line
      time.sleep(0.2)
      lines = read_temp_raw(device_file)
   equals_pos = lines[1].find('t=')                        # find temperature in the details
   if equals_pos != -1:
      temp_string = lines[1][equals_pos+2:]
      temp_c = float(temp_string) / 1000.0                 # convert to Celsius
      return temp_c

def device_present(device_file):
   return os.path.isfile(device_file)