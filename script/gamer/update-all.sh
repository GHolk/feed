#!/bin/sh

user_list="
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
"

for user in $user_list
do
    sleep 10s
    gamer/home-gamer.php $user >../gamer-$user.rss
done

tidy -q -utf8 -xml -m -i ../gamer-*.rss

