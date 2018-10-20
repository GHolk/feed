const JSDOM = require('jsdom').JSDOM
const RSS = require('rss')

const anafeed = {
    JSDOM, RSS,
    articleList: [],
    feed: null,
    async generateAndPrintFeed() {
        const url = this.feedOption.site_url
        try {
        await this.loadWindow(url)
        }
        catch (jsdomError) {
            console.log(jsdomError)
            return
        }
        this.extractArticleList()
        const feed = new this.RSS(this.feedOption)
        for (const article of this.articleList) {
            feed.item(article)
        }
        this.feed = feed
        console.log('%s', feed.xml({indent: true}))
    },
    async loadWindow(url) {
        this.dom = await this.JSDOM.fromURL(url)
        this.window = this.dom.window
    },
    feedOption: {
        title: '卡斯伯 Blog - 前端，沒有極限',
        description: '前端工程師，有關 CSS、javascript',
        generator: 'anafeed, RSS, JSDOM, node.js',
        feed_url: 'http://gholk.github.io/feed/wcc723.rss',
        site_url: 'http://wcc723.github.io/',
        image_url: 'http://wcc723.github.io/images/casper_blog.svg',
        docs: 'http://gholk.github.io/feed/',
        managingEditor: '卡斯伯 casper wcc723',
        webMaster: 'gholk',
        language: 'zh-TW',
        categories: ['front-end', 'javascript', 'css', 'html'],
        ttl: 24 * 60
    },
    extractArticleList() {
        const document = this.window.document
        const nodeList = document.querySelectorAll('#main .article-summary')
        for (const node of nodeList) {
            const article = this.parseArticle(node)
            this.articleList.push(article)
        }
    },
    parseArticle(node) {
        const url = node.querySelector('h1 a').href
        const title = node.querySelector('h1').textContent
        const description = node.querySelector('p.article-excerpt').textContent
        const date = node.querySelector('.date time').dateTime
        const category = node.querySelector('p.category').textContent
        const imageNode = node.querySelector('.thumbnail-image')
        const scan = imageNode.style.backgroundImage.match(/url\((.*)\)/)
        let enclosure
        if (scan) {
            enclosure = {
                url: scan[1],
                type: 'image'
            }
        }
        return {url, title, description, date, enclosure,
                categories: [category]}
    }
}

anafeed.generateAndPrintFeed()

// exports.anafeed = anafeed
