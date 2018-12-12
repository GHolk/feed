#!/usr/bin/env node

const JSDOM = require('jsdom').JSDOM
const RSS = require('rss')
const fs = require('fs')
const util = require('util')

function sleep(second) {
    return new Promise(wake => setTimeout(wake, second))
}

const anafeed = {
    JSDOM, RSS,
    articleList: [],
    feed: null,
    window: null,
    articleSelector: '',
    rssPath: '',
    promiseWriteContent: util.promisify(fs.writeFile),
    async generateFeed() {
        this.window = await this.loadWindow()
        await this.extractArticleList()
        const feed = new this.RSS(this.feedOption)
        for (const article of this.articleList) {
            feed.item(article)
        }
        this.feed = feed
        this.distruct()
    },
    get crawlUrl() {
        return this.feedOption.site_url
    },
    async write(path) {
        if (!path) path = this.rssPath
        const content = this.feed.xml({indent: true})
        await this.promiseWriteContent(path, content, 'utf8')
    },
    busy: sleep(1),
    loadInterval: 1,
    loadWindowLimit(url = this.crawlUrl) {
        const nextBusy = this.busy
            .then(() => sleep(this.loadInterval))
            .then(() => this.loadWindow(url))
        this.busy = nextBusy
        return nextBusy
    },
    async loadWindow(url = this.crawlUrl) {
        const dom = await this.JSDOM.fromURL(url)
        return dom.window
    },
    feedOption: {
        title: '',
        description: '',
        generator: 'anafeed: power by npm/RSS, npm/JSDOM, node.js',
        feed_url: '',
        site_url: '',
        image_url: '',
        docs: 'http://gholk.github.io/feed/',
        managingEditor: '',
        webMaster: 'gholk',
        language: 'zh-TW',
        categories: [],
        ttl: 24 * 60
    },
    async extractArticleList() {
        const document = this.window.document
        const nodeList = document.querySelectorAll(this.articleSelector)
        for (const node of nodeList) {
            let article
            try {
                article = await this.parseArticle(node)
            }
            catch (parseError) {
                console.error(parseError)
                article = null
            }
            if (article) this.articleList.push(article)
            else continue
        }
    },
    async parseArticle(node) {
        throw new Error('you have no parseArticle method!')
    },
    create(option) {
        const child = Object.create(this)
        Object.assign(child, option)
        child.articleList = []
        child.feedOption = Object.assign({}, this.feedOption, option.feedOption)
        return child
    },
    distruct() {
        this.window.close()
        this.window = null
    },
    async requireAndRun(path) {
        const libsite = require('./' + path)
        const site = libsite.inheritAnafeed(this)
        await site.generateFeed()
        await site.write('../' + site.rssPath)
    }
}

if (require.main == module) {
    for (const sitePath of process.argv.slice(2)) {
        anafeed.requireAndRun(sitePath)
    }
}
else module.exports = anafeed
