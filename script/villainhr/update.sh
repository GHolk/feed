#!/bin/sh

name=villainhr
url='http://villainhr.com'

cd $name
wget $url -O index.html
node extract.js > ../../$name.rss
rm index.html

