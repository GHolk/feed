#!/bin/sh

user_list="
    hp10000p
    GN02226420
    h804232006
    wuzo
    andy50312
"

for user in $user_list
do
    sleep 30s
    php gamer/home-gamer.php $user >../gamer-$user.rss
done

