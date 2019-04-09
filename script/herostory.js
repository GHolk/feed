

function inheritAnafeed(anafeed) {
    const herostory = {
        __proto__: anafeed,
        articleSelector: '.post_row.list-item',
        rssPath: 'herostory.rss',
        articleList: [],
        feedOption: {
            __proto__: anafeed.feedOption,
            title: '英雄故事',
            description: '有關傳奇的歷史英雄人物論壇熱門文章。',
            feed_url: 'http://gholk.github.io/feed/herostory.rss',
            site_url: 'https://www.herostory.tw/vf',
            image_url: 'https://www.herostory.tw/template/frontend/img/herostory/logo.png',
            pubDate: '2019-04-09',
            categories: ['history', 'story', 'novel']
        },
        parseArticle(node) {
            const url = node.querySelector('a.p_title').href
            const title = node.querySelector('a.p_title').textContent
            const description = node.querySelector('a.p_con').textContent
            const date = NaN
            const author = node.querySelector('.p_id_fx.p_id_r').textContent
            const category = node.querySelector('.p_label').textContent

            return {
                url, title, description, date, categories: [category]
            }
        }
    }
    return herostory
}

exports.inheritAnafeed = inheritAnafeed
