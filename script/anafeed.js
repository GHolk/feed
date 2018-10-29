#!/usr/bin/env node

const JSDOM = require('jsdom').JSDOM
const RSS = require('rss')
const fs = require('fs')
const util = require('util')

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
    },
    get crawlUrl() {
        return this.feedOption.site_url
    },
    async write(path) {
        if (!path) path = this.rssPath
        const content = this.feed.xml({indent: true})
        await this.promiseWriteContent(path, content, 'utf8')
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
            const article = await this.parseArticle(node)
            this.articleList.push(article)
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
