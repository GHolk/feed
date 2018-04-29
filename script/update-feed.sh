#!/bin/sh
set -e
work_directory="/home/gholk/code/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    activity-ncku/update.sh
    gamer/update-all.sh
    yinwang/update.sh
}

run_all

git commit -am 'auto daily update'
git push

