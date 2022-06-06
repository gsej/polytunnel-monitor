ffmpeg -pattern_type glob -i '../filtered-photos/2*.jpg' -filter:v "setpts=2*PTS"  -c:v libx264 -r 30 -pix_fmt yuv420p out-medium.mp4
