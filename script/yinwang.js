

class Article {
    constructor(title, url) {
        this.title = title
        this.url = url
    }
    async loadDescription(loadWindow) {
        this.window = await loadWindow(this.url)
        const document = this.window.document
        let firstNode = document.querySelector('h2 + *')
        this.description = firstNode.textContent
    }
    static fromAnchor(a) {
        const article = new this(a.textContent, a.href)
        let date
        let scan = a.href.match(/blog-cn\/(\d{4}\/\d{2}\/\d{2})/)
        if (scan) {
            date = scan[1]
            article.date = date
        }
        return article
    }
}

function inheritAnafeed(anafeed) {
    const yinwangOption = {
        Article,
        __proto__: anafeed,
        articleList: [],
        articleSelector: '.outer li a',
        rssPath: 'yinwang.rss',
        async parseArticle(node) {
            const article = this.Article.fromAnchor(node)
            // only load description of first article
            if (this.articleList.length == 0) {
                await article.loadDescription(this.loadWindow.bind(this))
            }
            return article
        },
        feedOption: {
            __proto__: anafeed.feedOption,
            title: '想當然我在扯蛋',
            description: '為王垠做的 rss',
            feed_url: 'http://gholk.github.io/feed/yinwang.rss',
            site_url: 'http://yinwang.org',
            image_url: 'http://www.yinwang.org/images/Yc.jpg',
            managingEditor: '王垠',
            pubDate: '2018-04-29',
            language: 'zh-CN',
            categories: ['program', 'computer'],
        }
    }
    return yinwangOption
}


exports.inheritAnafeed = inheritAnafeed
