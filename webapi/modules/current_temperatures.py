import os                                                  # import os module
import time                                                # import time module
import smbus

os.system('modprobe w1-gpio')                              # load one wire communication device kernel modules
os.system('modprobe w1-therm')                                                 

# use fixed list device filenames,  so we can always be sure of the order of the output
outsideProbe = '/sys/bus/w1/devices/28-3c01d075ef09/w1_slave'
insideProbe = '/sys/bus/w1/devices/28-3c01d075334f/w1_slave'

commandSent = False

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

def readAltInsideTemperature():
   sht30Data = readFromSHT30()

   if (sht30Data == None):
      return None
   
   temperature = ((((sht30Data[0] * 256.0) + sht30Data[1]) * 175) / 65535.0) - 45
   return temperature


def readRelativeHumidity():
   sht30Data = readFromSHT30()

   if (sht30Data == None):
      return None

   humidity = 100 * (sht30Data[3] * 256 + sht30Data[4]) / 65535.0
   return humidity

def readFromSHT30():
   return None
   # code taken from https://github.com/ControlEverythingCommunity/SHT30
   # Get I2C bus
   try:
      bus = smbus.SMBus(1)
   except FileNotFoundError:
      bus = None

   if bus == None:
      return None

   # SHT30 address, 0x44(68)
   # Send measurement command, 0x2C(44)
   #		0x06(06)	High repeatability measurement
   if (commandSent == False):
      bus.write_i2c_block_data(0x44, 0x2C, [0x06])
      commandSent = True

   time.sleep(0.5)

   # SHT30 address, 0x44(68)
   # Read data back from 0x00(00), 6 bytes
   # cTemp MSB, cTemp LSB, cTemp CRC, Humididty MSB, Humidity LSB, Humidity CRC
   data = bus.read_i2c_block_data(0x44, 0x00, 6)

   return data