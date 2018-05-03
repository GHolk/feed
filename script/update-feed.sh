#!/bin/sh
. /etc/profile

set -e
work_directory="/home/gholk/web/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    activity-ncku/update.sh
    gamer/update-all.sh
    yinwang/update.sh
}

run_all 2>>~/feed-error.log

git commit -am 'auto daily update'
git push

