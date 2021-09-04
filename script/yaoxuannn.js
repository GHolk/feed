

class Article {
    constructor(title, url) {
        this.title = title
        this.url = url
    }
    async loadDescription(loadWindow) {
        this.window = await loadWindow(this.url)
        const document = this.window.document
        let firstNode = document.querySelector('header + .content > p')
        this.description = firstNode.textContent
    }
    static fromEntry(entry) {
        const anchor = entry.querySelector('a')
        const title = anchor.textContent
        const url = anchor.href
        const article = new this(title, url)
        const date = entry.querySelector('time').getAttribute('datetime')
        article.date = date
        return article
    }
}

function inheritAnafeed(anafeed) {
    const option = {
        Article,
        __proto__: anafeed,
        articleList: [],
        articleSelector: '.post-item',
        rssPath: 'yaoxuannn.rss',
        crawlUrl: 'https://yaoxuannn.com/archives/',
        async parseArticle(node) {
            const article = this.Article.fromEntry(node)
            // only load description of first article
            if (this.articleList.length == 0) {
                await article.loadDescription(this.loadWindow.bind(this))
            }
            return article
        },
        feedOption: {
            __proto__: anafeed.feedOption,
            title: 'Yaoxuannn\'s Blog',
            description: '為Yaoxuannn做的 rss',
            feed_url: 'http://gholk.github.io/feed/yaoxuannn.rss',
            site_url: 'https://yaoxuannn.com',
            image_url: 'https://yaoxuannn.com/images/logo.png',
            managingEditor: 'yaoxuannn',
            pubDate: '2021-09-04',
            language: 'zh-CN',
            categories: ['linux', 'program', 'computer', 'sysadmin'],
        }
    }
    return option
}


exports.inheritAnafeed = inheritAnafeed
