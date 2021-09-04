#!/bin/sh
. /etc/profile

set -e
work_directory="/home/gholk/web/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    gamer/update-all.sh
    node_list='
        wcc723.js
        yinwang.js
        fe2x.js
        yaoxuannn.js
    '
    ./anafeed.js $node_list
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

