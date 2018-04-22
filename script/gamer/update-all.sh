#!/bin/sh

user_list="hp10000p GN02226420 h804232006 wuzo 3960868"

for user in $user_list
do
    php gamer/home-gamer.php $user >../gamer-$user.rss
done

