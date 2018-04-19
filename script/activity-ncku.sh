#!/bin/sh

url="http://activity.ncku.edu.tw/index.php?c=apply&m=read" 
cd ..
curl $url | iconv -f big5  >activity-ncku.html
node script/activity-ncku.js

