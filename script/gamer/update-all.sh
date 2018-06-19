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
"

for user in $user_list
do
    sleep 10s
    php gamer/home-gamer.php $user >../gamer-$user.rss
done

