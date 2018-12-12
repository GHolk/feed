

function inheritAnafeed(anafeed) {
    const tanews = {
        __proto__: anafeed,
        articleSelector: '#content .view-content .views-row',
        rssPath: 'tanews.rss',
        articleList: [],
        get crawlUrl() {
            const url = this.feedOption.site_url + 'info'
            return url
        },
        feedOption: {
            __proto__: anafeed.feedOption,
            title: '台灣動物新聞網 TANews',
            description: '中華民國動物保物協會的入口網站，有關保育、流浪動物的新聞。',
            feed_url: 'http://gholk.github.io/feed/tanews.rss',
            site_url: 'http://tanews.org.tw/',
            image_url: 'http://tanews.org.tw/sites/default/files/icon_01_0.png',
            pubDate: '2018-12-12',
            categories: ['news', 'animal']
        },
        parseArticle(node) {
            const url = node.querySelector('a').href
            const title = node.querySelector('h3 a').textContent
            const description = node.querySelector('p').textContent
            const date = node.querySelector('.date').textContent
            const category = node.querySelector('.post-category').textContent

            let imageNode = node.querySelector('a img')
            let enclosure
            if (imageNode) {
                enclosure = {
                    url: imageNode.src,
                    type: 'image'
                }
            }
            return {
                url, title, description, date, enclosure,
                categories: [category]
            }
        }
    }
    return tanews
}

exports.inheritAnafeed = inheritAnafeed
