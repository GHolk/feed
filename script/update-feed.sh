#!/bin/sh
. /etc/profile

set -e
work_directory="/home/gholk/web/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    activity-ncku/update.sh
    gamer/update-all.sh
    villainhr/update.sh
    ./update.js wcc723.js yinwang.js
}

network_on() {
    host home.gamer.com.tw
}
warn() {
    echo "$@" >&2
}

if network_on
then
    run_all
    git commit -am 'auto daily update'
    git push
    exit 0
else
    warn "network not work!"
    exit 1
fi

