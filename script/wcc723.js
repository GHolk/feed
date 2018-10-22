
function inheritAnafeed(anafeed) {
    const wcc723 = {
        __proto__: anafeed,
        articleSelector: '#main .article-summary',
        rssPath: 'wcc723.rss',
        articleList: [],
        feedOption: {
            __proto__: anafeed.feedOption,
            title: '卡斯伯 Blog - 前端，沒有極限',
            description: '前端工程師，有關 CSS、javascript',
            feed_url: 'http://gholk.github.io/feed/wcc723.rss',
            site_url: 'http://wcc723.github.io/',
            image_url: 'http://wcc723.github.io/images/casper_blog.svg',
            managingEditor: '卡斯伯 casper wcc723',
            pubDate: '2018-10-20',
            categories: ['front-end', 'javascript', 'css', 'html']
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
    return wcc723
}

exports.inheritAnafeed = inheritAnafeed
