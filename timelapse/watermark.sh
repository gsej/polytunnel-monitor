for img in ../filtered-photos/*jpg; 
do 
	echo $img;
	convert "$img" -gravity SouthEast -pointsize 100 -fill white -annotate +30+30  %[exif:DateTime] "$img"; 
done
