#!/bin/sh
work_directory="/home/gholk/code/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    ./activity-ncku.sh
}

run_all

git commit -am 'auto daily update'
git push

