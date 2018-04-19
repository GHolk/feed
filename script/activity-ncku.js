

class Activity {
    constructor($tableRow) {
        this.$node = $tableRow
    }
    $(selector) {
        return this.$node.find(selector)
    }
    get image() {
        return this.$('td:nth-child(1) img').attr('src')
    }
    get content() {
        return this.$('td:nth-child(2)').text()
    }
    get title() {
        return this.$('td:nth-child(4)').text()
    }
    get date() {
        return this.$('td:nth-child(6)').text()
    }
    get location() {
        return this.$('td:nth-child(7)').text()
    }
    get url() {
        const scan = this.$node.attr('id').match(/\d+$/)
        const id = scan[0]
        const url = `https://activity.ncku.edu.tw/index.php?c=apply&no=${id}`
        return url
    }
}

class Entry {
    constructor($) {
        this.$node = $(`<entry>
<id></id>
<title></title>
<published></published>
<link rel="alternate" type="text/html" />
<link rel="alternate" type="image/jpg" />
<summary></summary>
</entry>`)
    }
    $(selector) {
        return this.$node.find(selector)
    }
    set title(title) {
        this.$('title').text(title)
    }
    set url(url) {
        this.$('id').text(url)
        this.$('link:nth-child(5)').attr('href', url)
    }
    set date(date) {
        this.$('published').text(date)
    }
    set image(url) {
        const suffix = url.match(/\..{3,5}$/)[0].slice(1)
        this.$('link:nth-child(6)')
            .attr('href', url)
            .attr('type', `image/${suffix}`)
    }
    set content(content) {
        this.$('summary').text(content)
    }
    load(object) {
        const keys = 'title,url,date,content,image'.split(/,/g)
        for (const key of keys) {
            this[key] = object[key]
        }
    }
}

const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cheerio = require('cheerio')
const cheerioOption = {
    decodeEntities: true,
    xmlMode: true,
    withDomLvl1: true,
    normalizeWhitespace: false
}

function updateFeed($html, $feed) {
    $feed('entry').remove()
    $html('tr').get().slice(1)
        .map(tr => new Activity($html(tr)))
        .map(activity => {
            const entry = new Entry($feed)
            entry.load(activity)
            return entry
        })
        .forEach(entry => {
            $feed('feed').append(entry.$node)
        })
    return $feed
}

async function main() {
    const filename = 'activity-ncku'
    const xml = filename + '.xml'
    const html = filename + '.html'
    const feed = await readFile(xml, 'utf8')
    const $feed = cheerio.load(feed, cheerioOption)
    const activity = await readFile(html, 'utf8')
    const $activity = cheerio.load(activity, cheerioOption)
    updateFeed($activity, $feed)
    fs.writeFile(xml, $feed.xml(), 'utf8', () => 0)
}

main()
