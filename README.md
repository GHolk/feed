# manual update rss feed [github] [gh-pages]
some website not provide rss feed for subscribe,
so i write some script to generate rss in atom format,
and publish they by github page.

[github]: http://github.com/GHolk/feed/
[gh-pages]: http://gholk.github.io/feed/

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

remeber to change the path to the directory of feed
in `script/update-feed.sh` .


## rss feed
there is a [easy website frontend][gh-pages] ,
also a list of all rss at <http://gholk.github.io/feed/list.atom> .

<link rel="alternate" type="application/atom+xml" href="list.atom">

<div id="feed-content"></div>

<style>
  .date {
    font-style: italic;
  }
  a.feed::after, a.website::after {
    color: black;
    content: "]";
  }
  a.feed::before, a.website::before {
    color: black;
    content: "[";
  }
</style>

<template id="feed-info">
  <article>
    <h2></h2>
    <small class="date"></small>
    <p></p>
    <a class="feed">feed</a>
    <a class="website">website</a>
  </article>
</template>

<script>
loadFeedList()

async function loadFeedList() {
  const xml = await fetchList()
  const entryList = xml.querySelectorAll('entry')
  const fragment = document.createDocumentFragment()
  for (const entry of entryList) {
    const article = templateEntry(entry)
    fragment.appendChild(article)
  }
  document.querySelector('#feed-content').appendChild(fragment)

  function getArticleTemplate() {
    const template = document.querySelector('#feed-info')
    const article = template.content.querySelector('article')
    const deep = true
    return article.cloneNode(deep)
  }
  function templateEntry(entry) {
    const article = getArticleTemplate()
    const q = 'querySelector'
    const t = 'textContent'
    const g = 'getAttribute'
    article[q]('h2')[t] = entry[q]('title')[t]
    article[q]('.date')[t] = entry[q]('published')[t]
    article[q]('p')[t] = entry[q]('summary')[t]
    const feedSelector = `link[type="application/atom+xml"],
                          link[type="application/rss+xml"]`
    article[q]('.feed').href = entry[q](feedSelector)[g]('href')
    article[q]('.website').href = entry[q]('link[type="text/html"]')[g]('href')
    return article
  }
  async function fetchList() {
    const url = 'list.atom'
    const response = await fetch(url)
    const text = await response.text()
    const xml = parseXml(text)
    return xml
  }
  function parseXml(text) {
    const domParser = new DOMParser()
    const xml = domParser.parseFromString(text, 'application/xml')
    return xml
  }
}
</script>
