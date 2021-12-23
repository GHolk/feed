#!/usr/bin/env node
const anafeed = require('./anafeed')
const sleep = anafeed.sleep

const gamer = {
    __proto__: anafeed,
    user: null,
    nick: null,
    articleSelector: '.HOME-mainbox1',
    parseArticle(node) {
        const h1 = node.querySelector('h1')
        const title = this.parseTitle(h1)
        const url = h1.querySelector('a').href
        const description =  node.querySelector('.ST1 ~ p').textContent

        const info = node.querySelector('h1 ~ .ST1')
        let date
        const scan = info.textContent.match(/\d{4}-\d\d-\d\d.+\d\d:\d\d:\d\d/)
        if (scan) {
            date = scan[0]
        }

        if (!this.nick) {
            let author = info.querySelector('a')
            if (author) this.nick = author.textContent
        }

        const image = node.querySelector('.HOME-mainbox1a.BC5 img')
        let enclosure
        if (image) enclosure = {url: image.src}

        return {title, url, description, date, enclosure}
    },
    async extractArticleList() {
        await super.extractArticleList()
        if (this.nick) {
            this.feedOption.author += ` (${this.nick})`
        }
    },
    rssPath: `gamer.rss`,
    feedOption: {
        __proto__: anafeed.feedOption,
        title: `巴哈小屋`,
        feed_url: `http://gholk.github.io/feed/gamer.rss`,
        site_url: `https://home.gamer.com.tw/creation.php?owner=`,
        language: 'zh-TW',
        categories: ['gamer'],
    },
    parseTitle(h1) {
        // https://i2.bahamut.com.tw/css/basic.css
        const categoryCode = h1.querySelector('img').className
        const title = h1.textContent.trim()
        const category = this.categoryMap[categoryCode]
        if (category) return `[${category}] ${title}`
        else return title
    },
    categoryMap: {
        'IMG-C11': '同人',
        'IMG-C10': 'cosplay',
        'IMG-C09': '日誌',
        'IMG-C08': '小說',
        'IMG-C07': '插畫',
        'IMG-C07-comic': '插畫',
    },
    async runUser(user) {
        const home = {
            __proto__: this,
            user: user,
            articleList: [],
            rssPath: `gamer-${user}.rss`,
            feedOption: {
                __proto__: this.feedOption,
                title: `${user} 的小屋`,
                feed_url: `http://gholk.github.io/feed/gamer-${user}.rss`,
                site_url: `https://home.gamer.com.tw/creation.php?owner=${user}`,
                author: user,
                language: 'zh-TW',
                categories: ['gamer'],
            }
        }
        await home.generateFeed()
        await home.write('../' + home.rssPath)
    }
}

if (require.main == module) {
    let busy = sleep(0)
    for (const user of process.argv.slice(2)) {
        busy = busy
            .then(() => gamer.runUser(user))
            .then(() => sleep(1000))
    }
}
else module.exports = gamer
