
const JSDOM = require('jsdom').JSDOM
const RSS = require('rss')

async function loadWindow(url) {
    const dom = await JSDOM.fromURL(url)
    return dom.window
}

class Article {
    static fromAnchor(a) {
        const article = new this(a.textContent, a.href)
        let date
        let scan = a.href.match(/blog-cn\/(\d{4}\/\d{2}\/\d{2})/)
        if (scan) date = scan[1]
        article.date = date
        return article
    }
    static fromFanPageArticle(article) {
        const object = new this()
        object.url = getUrl()
        object.content = getContent()
        return object
        
        function getContent() {
            let p = article.querySelectorAll('p')
            p = Array.from(p)
            return p.map(p => {
                const deep = true
                const cloneP = p.cloneNode(deep)
                cloneP.innerHTML = cloneP.innerHTML.replace(/<br>/g, '\n')
                return cloneP.textContent
            }).join('\n')
        }
        function getUrl() {
            const a = article.querySelector('div:last-child > div:last-child > a:last-child')
            return a.href
        }
    }
}

function extractArticle(window) {
    const document = window.document
    const list = []
    const articleNodes = document.querySelectorAll('#recent > div > div > *')
    for (const article of articleNodes) {
        const object = Article.fromFanPageArticle(article)
        list.push(object)
    }
    return list
}


