# manual update rss feed
some website not provide rss feed for subscribe,
so i write some script to generate rss in atom format,
and publish they by github page.

just run `script/update-feed.sh` 
then get all feed get update.
if want to add any new feed,
add the script to execute 
in function `run_all` in `script/update-feed.sh` :

```sh
run_all() {
    activity-ncku/update.sh
    gamer/update-all.sh
    # add your script there
}
```

the script in run all will be execute
in directory `script/` ,
so access the rss file in `../` .

the script is can be run by anacron,
or by cron if your machine naver shutdown.
this is easy anacrontab example:

```anacrontab
1   3    update-feed /home/gholk/feed/script/update-feed.sh
```

or crontab:

```crontab
# minute hour day-of-month month day-of-week command
# run every day
  11     21   *            *     *           /home/gholk/feed/script/update-feed.sh
```

## rss feed

<link rel="alternate" type="application/atom+xml" href="list.atom">

### 成功大學活動資訊列表
這個表單會更新近期所有在成大舉行的活動，
包括展覽和演講，主要是演講。
是自己用 node.js 寫的。

* [atom](http://gholk.github.io/feed/activity-ncku.atom)
* [html](http://activity.ncku.edu.tw)

### 巴哈姆特勇者小屋
這是直接用 [現成的 php library][gamer-to-rss] ，
但因為我沒有 server，就是直接執行，
沒有在 web server 上跑。

[gamer-to-rss]: https://github.com/wsmwason/gamer-to-rss

#### hp10000p
隨便找個人來測試小屋能不能動。
* [rss](http://gholk.github.io/feed/gamer-hp10000p.rss)
* [html](http://home.gamer.com.tw/homeindex.php?owner=hp10000p)

#### andy50312
一個在成長後，仍不忘談論童年回憶的部落格。
* [rss](http://gholk.github.io/feed/gamer-andy50312.rss)
* [html](http://home.gamer.com.tw/andy50312)

#### GN02226420
每月新番介紹。
* [rss](http://gholk.github.io/feed/gamer-GN02226420.rss)
* [html](http://home.gamer.com.tw/GN02226420)

#### 仙界大師
仙界大師在巴哈的勇者小屋。
* [rss](http://gholk.github.io/feed/gamer-h804232006.rss)
* [html](http://home.gamer.com.tw/h804232006)

<script> document.write('hello world!') </script>
