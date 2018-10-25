
const fs = require('fs')
const util = require('util')
const readDirectory = util.promisify(fs.readdir)
const readFile = util.promisify(fs.readFile)

function inheritAnafeed(anafeed) {
    const gamer = {
        __proto__: anafeed,
        articleSelector: '.HOME-mainbox1b',
        // rssPath: 'fe2x.rss',
        articleList: [],
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
        parseArticle(node) {
            const url = node.querySelector('h2 a').href
            const title = node.querySelector('h2 a').textContent

            const descriptionNode =
                  node.querySelector('.post-body').cloneNode(true)
            this.cleanDescriptionNode(descriptionNode)
            const description = descriptionNode.textContent

            const dateSelector = '.post-time time[itemprop=dateModified]'
            const date = node.querySelector(dateSelector).dateTime

            const categoryNode = node.querySelector('.post-category a')
            const categories = []
            if (categoryNode) categories.push(categories.textContent)

            let imageNode = node.querySelector('.post-gallery-img img')
            let enclosure
            if (imageNode) {
                enclosure = {
                    url: imageNode.src,
                    type: 'image'
                }
            }
            return {url, title, description, date, enclosure, categories}
        }
    }
    const gamerList = {
        createGamerFeed(option) {
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
    return fe2x
}

exports.inheritAnafeed = inheritAnafeed
