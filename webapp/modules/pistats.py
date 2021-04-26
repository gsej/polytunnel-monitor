from flask import Flask, render_template, request, redirect
import datetime, psutil, platform, os, json

class Stats:
    def __init__(self):
#        self.launchtime = datetime.datetime.now()
        #f = open("config.json", "r")
        #config = json.load(f)
        #f.close()
        self.host = 'host here' #config["host"]
        self.port = 'port here' #config["port"]
        self.password = 'password here' #config["password"]

    def uptime(self):
        "get raspberry uptime"

       # uptime = datetime.datetime.now() - self.launchtime
       # hours, x = divmod(int(uptime.total_seconds()), 3600)
       # minutes, seconds = divmod(x, 60)
       # days, hours = divmod(hours, 24)


        # temporary hack:
        days = 0
        hours = 0
        minutes = 0
        seconds = 0
        uptime = {
            "days": days,
            "hours": hours,
            "minutes": minutes,
            "seconds": seconds
        }

        return uptime

    def temperature(self):
        temp = os.popen("vcgencmd measure_temp").readline()
        return (temp.replace("temp=","").replace("'", "&#176;"))

    def disk(self):
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
            "system": platform.system(),
            "machine": platform.machine(),
            "architecture": f"{platform.architecture()[1]} {platform.architecture()[0]}",
            "temperature": self.temperature(),
            "disk": self.disk()
        }      
        
        return stats