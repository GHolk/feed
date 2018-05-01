#!/bin/sh

url="http://activity.ncku.edu.tw/index.php?c=apply&m=read" 
name=activity-ncku
wget $url -O - | iconv -f big5  >../$name.html
node $name/update.js ../$name
rm ../$name.html

