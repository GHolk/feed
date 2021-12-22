#!/bin/sh
. /etc/profile

set -e
work_directory="/home/gholk/web/feed"

cd $work_directory/script

run_all() {
    # add script you want to run below
    node_list='
        wcc723.js
        yinwang.js
        fe2x.js
        yaoxuannn.js
    '
    ./anafeed.js $node_list
    ./gamer-home.js $gamer_list
}

gamer_list='
    hp10000p
    GN02226420
    h804232006
    wuzo
    andy50312
    Spacefaucet
    y541258
    ericlee0602
    Erika
    chocolatebox
    e123456789
    lnkkng
    mitsueyn
    zxp921
    hbl917070
    kurino1996
    c2432565
    htpxr0337
    chasedrea
    wind945
    b775232000
'

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

