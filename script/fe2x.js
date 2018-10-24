

function inheritAnafeed(anafeed) {
    const fe2x = {
        __proto__: anafeed,
        articleSelector: '#posts article',
        rssPath: 'fe2x.rss',
        articleList: [],
        feedOption: {
            __proto__: anafeed.feedOption,
            title: 'ClarenceC fe2x',
            description: '中國前端工程師，有關 javascript 與與一些 command line 工具',
            feed_url: 'http://gholk.github.io/feed/fe2x.rss',
            site_url: 'http://fe2x.cc/',
            image_url: 'http://fe2x.cc/favicon.ico',
            managingEditor: 'CalarenceC',
            pubDate: '2018-10-24',
            categories: ['front-end', 'javascript']
        },
        cleanDescriptionNode(node) {
            const h1 = node.querySelector('h1')
            if (h1) h1.remove()
            const readMore = node.querySelector('.post-button')
            if (readMore) readMore.remove()
            return node
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
    return fe2x
}

exports.inheritAnafeed = inheritAnafeed
