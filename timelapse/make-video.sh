ffmpeg -r 1 -pattern_type glob -i '../filtered-photos/2*.jpg' -c:v libx264 out-slow.mp4
