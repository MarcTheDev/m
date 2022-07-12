const axios = require('axios')

async function verify1(url ,alt) {
    try {
        var url1 = ""
        var alt1 = ""
        url1 = url.replace(" (TV)", "")
        url1 = url1.replaceAll(" ", "-")
        url1 = url1.toLowerCase()

        alt1 = alt.replace("tv", "")
        try {
            //
            var url2 = "https://goload.pro/videos/" + url1 + "-episode-1"
            console.log
            const { data } = await axios.get(url2)
            var json = JSON.parse(data)
            console.log(json)
            if(json === 404) {
                url1 = alt1
                console.log("Changed url to v2: " + url1)
                return url1;
            } else {
                url1 = url1.replaceAll("-", "")
                console.log("Changed url to: " + url1)
                return url1;
            }
        } catch (error) {
            // returns valid url from start
            url1 = url1.replaceAll(" ", "-")
            console.log("Changed url: " + url1)
            return url1;
        }

    } catch (error) {
        console.error(error)
        return;
    }
}
verify1("Spy x Family", "spy-x-family")
module.exports = {
    verify1
}