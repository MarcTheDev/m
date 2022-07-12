const cheerio = require('cheerio')
const axios = require('axios')

async function scrapeVid(name, ep) {
    try {
        var url = "https://goload.pro/videos/" + name + "-episode-" + ep;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        var iframe = $("iframe").attr("src");
        var total = $("li.video-block").find("a").attr("href")
        var title = $("h1").text()
        title = title.split("Episode")[0]
        total = total.split("/videos/" + name + "-episode-").pop()
        console.log(title)
        iframe = iframe.split("?id=").pop().split("=")[0]
        

    } catch (error) {
        console.error(error)
    }
    return {
      iframe: iframe,
      total: total,
      title: title
    }

}
module.exports = {
    scrapeVid
}