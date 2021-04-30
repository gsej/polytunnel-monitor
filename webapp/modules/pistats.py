from flask import Flask, render_template, request, redirect
import datetime, psutil, platform, os, json
import sys
import smbus

class Stats:

    def __init__(self):

        try:
            self.i2c = smbus.SMBus(1)
        except FileNotFoundError:
            self.i2c = None

    def uptime(self):
        "get raspberry uptime"

        uptime = os.popen("uptime -p").readline()
        return uptime

    def temperature(self):
        temp = os.popen("vcgencmd measure_temp").readline()
        return (temp.replace("temp=","").replace("'", "&#176;"))

    def fanspeed(self):
        # reads speed of PiCoolFAN4

        if self.i2c != None:
            speed = self.i2c.read_word_data(0x60, 0x02)
        else:
            speed = "No PiCoolFAN4 found"

        return speed

    def disk(self):
        # assumes that we only care about the first partition
        diskspace = os.popen("df -h").read().splitlines()[1].split()

        disk_stats = {
            "total": diskspace[1],
            "used": diskspace[2],
            "available": diskspace[3],
            "using": diskspace[4]
        }

        return disk_stats

    def get_stats(self):
        "get all raspberry stats"

        stats = {
            "uptime": self.uptime(),
            "memory": f"{psutil.virtual_memory()[2]}%",
            "cpu": f"{psutil.cpu_percent()}%",
            "node": platform.node(),
            "temperature": self.temperature(),
            "fanspeed": self.fanspeed(),
            "disk": self.disk()
        }      
        
        return stats
