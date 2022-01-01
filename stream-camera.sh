raspivid -o - -t 9999999 -w 800 -h 600  | cvlc -vvv stream:///dev/stdin --sout '#standard{access=http,mux=ts,dst=:8080}' :demux=h264
