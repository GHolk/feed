# manual update rss feed
some website not provide rss feed for subscribe,
so i write some script to generate rss in atom format,
and publish they by github page.

the script is run by anacron,
just run `script/update-feed.sh` 
then get all feed get update.

if want to add any new feed,
add the script to execute 
in function `run_all` in `script/update-feed.sh` :

```sh
run_all() {
    ./activity-ncku.sh
    # add your script there
}
```

## rss feed

### 成功大學活動資訊列表
這個表單會更新近期所有在成大舉行的活動，
包括展覽和演講，主要是演講。

* [atom](http://gholk.github.io/feed/activity-ncku.xml)
* [html](http://activity.ncku.edu.tw)


