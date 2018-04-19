#!/bin/sh
work_directory="/home/gholk/code/feed"
script_list='activity-ncku.sh'

cd $work_directory/script
for shell_script in $script_list
do
    sh -e $shell_script
done

git commit -am 'auto daily update'
git push

