
const fs = require('fs')
const util = require('util')
const readDirectory = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

function inheritAnafeed(anafeed) {
    const gamerFeed = {
        __proto__: anafeed,
        articleSelector: '.HOME-mainbox1',
        // rssPath: 'fe2x.rss',
        articleList: [],
        get crawlUrl() {
            const homePage = this.feedOption.site_url
            return homePage.replace(/(\w+)$/, 'creation.php?owner=$1')
        },
        async write() {
            console.log(this.feed.xml({indent: true}))
        },
        async loadOptionByName(name) {
            const json = await readFile(`gamer/${name}.json`)
            const option = JSON.parse(json)
            Object.assign(this.feedOption, option)
        },
        async createFeed(name) {
            const child = Object.create(this)
            child.feedOption = Object.create(this.feedOption)
            child.loadOptionByName(name)
            return child
        },
        cleanDescriptionNode(node) {
            const allAnchor = node.querySelectorAll('a')
            if (allAnchor.length > 1) allAnchor[allAnchor.length - 1].remove()
        },
        parseCategory(node) {
            const scan = node.className.match(/^IMG-(C..)$/)
            if (scan) return this.categoryMap[scan[1]]
            else return undefined
        },
        categoryMap: {
            C07: '繪圖',
            C08: '小說',
            C09: '日誌',
            C10: 'cosplay',
            C11: '同人'
        },
        parseArticle(node) {
            const url = node.querySelector('a.TS1').href
            const title = node.querySelector('a.TS1').textContent

            const descriptionNode =
                  node.querySelector('p').cloneNode(true)
            this.cleanDescriptionNode(descriptionNode)
            const description = descriptionNode.textContent

            const metaNode = node.querySelector('.ST1')
            const dateString = metaNode.lastChild.textContent
            const scan = dateString.match(/^\|(\d{4}-\d\d-.*?)\|/)
            let date
            if (scan) date = scan[1]

            const categoryNode = node.querySelector('h1 img')
            const category = this.parseCategory(categoryNode)
            const categories = []
            if (category) categories.push(category)

            let imageNode = node.querySelector('.HOME-mainbox1a img')
            let enclosure = {
                url: imageNode.src,
                type: 'image'
            }
            return {url, title, description, date, enclosure, categories}
        }
    }
    const gamerList = {
        gamerFeed,
        feedList: [],
        async addGamerFeed(name) {
            const feed = await this.createGamerFeed(name)
            this.feedList.push(feed)
        },
        async createGamerFeed(name) {
            return await this.gamerFeed.createFeed(name)
        },
        async generateFeed() {
            // no block there, or node.js will wait until all feed load
            for (const gamerFeed of this.feedList) {
                gamerFeed.generateFeed()
            }
        },
        async write() {
            const allWrite = this.feedList.map(gamer => gamer.write())
            return Promise.all(allWrite)
        }
    }
    return gamerList
}

exports.inheritAnafeed = inheritAnafeed
