const axios = require('axios')
const { json } = require('express')
const e = require('express')
const requests = require('request-promise')


async function verify1(url, alt) {
    try {
        console.log("Url: " + url)
        console.log("Alt: " + alt)
        var url1 = ""
        var alt1 = ""
        var url1, url2, url3, url4, url5, url6, url7, new_url = ""
        url1 = url.replace(" (TV)", "")
        url1 = url1.replace("(", "")
        url1 = url1.replace(")", "")
        url1 = url1.replaceAll("- ", "")
        url1 = url1.replace(",", "")
        url1 = url1.replace(".", "")
        url1 = url1.replace(":", "")
        url1 = url1.toLowerCase()

        alt1 = alt.replace(" (TV)", "")
        alt1= alt1.replace("(", "")
        alt1 = alt1.replace(")", "")
        alt1 = alt1.replace(",", "")
        alt1 = alt1.replace(".", "")
        alt1 = alt1.replace(":", "")
        alt1 = alt1.toLowerCase()
        try {
            url1 = url1.replace("---", "-")
            url1 = url1.replaceAll(" ", "-")
            var reg = url1
            var alt_ = alt1
            var nodash = url1.replaceAll("-", "")
            const [main_url, second_url, alt_url, tv_url, dub] = await Promise.all([
                requests.get("https://goload.pro/videos/" + reg + "-episode-1"),
                requests.get("https://goload.pro/videos/" + nodash + "-episode-1"),
                requests.get("https://goload.pro/videos/" + alt_ + "-episode-1"),
                requests.get("https://goload.pro/videos/" + alt_ + "-tv-episode-1"),
                requests.get("https://goload.pro/videos/" + alt_ + "-dub-episode-1")
            ]);
            // First Url
            try {
                JSON.parse(main_url)
            } catch (error) {
                url1 = reg
                console.log(url1)
                return url1
            }
            // Second Url
            try {
                JSON.parse(second_url)
            } catch (error) {
                url1 = nodash
                console.log(url1)
                return url1
            }
            // Alt url
            try {
                JSON.parse(alt_url)
            } catch (error) {
                url1 = alt_
                console.log(url1)
                return url1
            }
            // Tv url
            try {
                JSON.parse(tv_url)
            } catch (error) {
                url1 = alt_ + "-tv"
                console.log(url1)
                return url1
            }
            // Dub url
            try {
                JSON.parse(dub)
            } catch (error) {
                url1 = alt_ + "-dub"
                console.log(url1)
                return url1
            }
        } catch (error) {
            console.log(error)
        }

    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    verify1
}