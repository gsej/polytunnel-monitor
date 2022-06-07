for img in filtered_photos/*jpg; 
do convert "$img" -gravity SouthEast -pointsize 100 \
   -fill white -annotate +30+30  %[exif:DateTimeOriginal] "$img"; 
done
