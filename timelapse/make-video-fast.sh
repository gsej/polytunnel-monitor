#ffmpeg -framerate 30 -pattern_type glob -i 'filtered_photos/2*.jpg'   -c:v libx264 -r 1 -pix_fmt yuv420p out-fast.mp4
ffmpeg -pattern_type glob -i '../filtered-photos/2*.jpg'   -c:v libx264 -r 30 -pix_fmt yuv420p out-fast.mp4
