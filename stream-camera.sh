raspivid -o - -t 9999999 -w 800 -h 600  --vflip --hflip | cvlc -vvv stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=:8080}' :demux=h264
