
function inheritAnafeed(anafeed) {
    const vilainhr = {
        __proto__: anafeed,
        rssPath: 'villainhr.rss',
        articleList: [],
        feedOption: {
            __proto__: anafeed.feedOption,
            title: '前端小吉米',
            description: '寫文章很詳細很認真的前端工程師',
            feed_url: 'http://gholk.github.io/feed/villainhr.rss',
            site_url: 'http://villainhr.com',
            image_url: 'https://www.villainhr.com/favicon.ico',
            magagingEditor: 'villainhr',
            language: 'zh-CN',
            categories: ['program', 'computer', 'web'],
            pubDate: '2018-05-28',
        },
        articleSelector: '.post-wrap',
        parseArticle(node) {
            const url = node.querySelector('a').href
            const title = node.querySelector('h3').textContent
            const description = node.querySelector('.post-desc').textContent
            const date = node.querySelector('.post-date').textContent
            return {url, title, description, date}
        }
    }
    return vilainhr
}

exports.inheritAnafeed = inheritAnafeed
