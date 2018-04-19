#!/bin/sh
work_directory="/home/gholk/code/feed"

cd $work_directory/script
for shell_script in *.sh
do
    sh -e $shell_script
done



