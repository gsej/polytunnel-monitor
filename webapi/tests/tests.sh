echo temperaturerange
time curl  -so out1 http://192.168.1.73:5000/api/temperaturerange/2021-01-01/2021-12-31/20  -w '%{size_download}'





