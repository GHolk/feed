
const JSDOM = require('jsdom').JSDOM
const RSS = require('rss')

class Article {
    constructor(title, url) {
        this.title = title
        this.url = url
    }
    static fromAnchor(a) {
        const article = new this(a.textContent, a.href)
        let date
        let scan = a.href.match(/blog-cn\/(\d{4}\/\d{2}\/\d{2})/)
        if (scan) date = scan[1]
        article.date = date
        return article
    }
}

async function loadWindow(url) {
    const dom = await JSDOM.fromURL(url)
    return dom.window
}
function extractArticle(window) {
    const document = window.document
    const list = []
    for (const anchor of document.querySelectorAll('.outer li a')) {
        const article = Article.fromAnchor(anchor)
        list.push(article)
    }
    return list
}

function createRss(list) {
    const feedOption = {
        title: '想當然我在扯蛋',
        description: '為王垠做的 rss',
        generator: 'node.js with npm rss',
        feed_url: 'http://gholk.github.io/feed/yinwang.rss',
        site_url: 'http://yinwang.org',
        image_url: 'http://www.yinwang.org/images/Yc.jpg',
        docs: 'http://gholk.github.io/feed',
        magagingEditor: 'gholk',
        language: 'zh-TW',
        categories: ['program', 'computer'],
        pubDate: new Date(),
        ttl: 60 * 24
    }
    const feed = new RSS(feedOption)
    list.forEach(article => feed.item(article))
    return feed
}
function saveFeed(feed) {
    const indent = true
    console.log(feed.xml({indent}))
}

async function update() {
    const url = 'http://yinwang.org'
    const window = await loadWindow(url)
    const articleList = extractArticle(window)
    const feed = createRss(articleList)
    saveFeed(feed)
}

update()
