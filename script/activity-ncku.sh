#!/bin/sh

file=activity-ncku
url="http://activity.ncku.edu.tw/index.php?c=apply&m=read" 
cd ..
curl $url | iconv -f big5  >$file.html
node script/$file.js
rm $file.html

