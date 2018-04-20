#!/bin/sh

user_list="hp10000p"

for user in $user_list
do
    php gamer/home-gamer.php $user >../gamer-$user.rss
done

