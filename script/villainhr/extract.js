
const cheerio = require('cheerio')
const RSS = require('rss')

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)

const rssDetail = {
    title: '前端小吉米',
    description: '幫吉米做的 RSS',
    generator: 'node.js with npm rss and cheerio html parser',
    feed_url: 'http://gholk.github.io/feed/villainhr.rss',
    site_url: 'http://villainhr.com',
    image_url: 'https://www.villainhr.com/favicon.ico',
    docs: 'http://gholk.github.io/feed',
    magagingEditor: 'gholk',
    language: 'zh-CN',
    categories: ['program', 'computer', 'web'],
    pubDate: new Date(),
    ttl: 60 * 24
}

async function readPrintRss() {
    const file = './index.html'
    const html = await readFile(file, 'utf8')
    const list = extractPostList(html)
    const rss = new RSS(rssDetail)
    for (const item of list) rss.item(item)
    const xml = rss.xml({indent: true})
    console.log(xml)
}

function extractPostList(html) {
    const $ = cheerio.load(html)
    return $('.post-wrap').map((i, div) => {
        const $div = $(div)
        const title = $div.find('h3').text()
        const relativeUrl = $div.find('a').attr('href')
        const url = rssDetail.site_url + relativeUrl
        const date = $div.find('.post-date').text()
        const description = $div.find('.post-desc').text()
        return {title, url, date, description}
    }).get()
}

readPrintRss()
