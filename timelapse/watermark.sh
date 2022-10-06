for img in ../filtered-photos/*jpg; 
do convert "$img" -gravity SouthEast -pointsize 100 \
   -fill white -annotate +30+30  %[exif:DateTime] "$img"; 
done
