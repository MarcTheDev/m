const {
    json
} = require('express');
const {
    ConsoleMessage
} = require('puppeteer');
var request = require('request-promise');
var jsonObject;

async function getInfo(url) {
    try {
        var title, title_english, title_jp, button_alt, score, episodes, synopsis, title_abr, popularity, rating, duration, poster, banner,
            genres, url1, url2, url3, status, buttonurl = "";
        var id = url    
        url = "https://kitsu.io/api/edge/anime/" + url;
        const headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
        }
        await request(url, headers, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var jsonObject = JSON.parse(body)
                title = jsonObject.data.attributes.canonicalTitle;
                console.log("Title: " + title)
                title_jp = jsonObject.data.attributes.titles.ja_jp;
                title_english = jsonObject.data.attributes.titles.en_jp;
                title_abr = jsonObject.data.attributes.titles.abbreviatedTitles;
                score = jsonObject.data.attributes.averageRating;
                score = score / 10
                score = score.toFixed(1)
                status = jsonObject.data.attributes.status;
                synopsis = jsonObject.data.attributes.synopsis
                episodes = jsonObject.data.attributes.episodeCount;
                if (episodes == null) {
                    episodes = "Unknown";
                }
                popularity = "#" + jsonObject.data.attributes.popularityRank;
                rating = jsonObject.data.attributes.ageRatingGuide;
                duration = jsonObject.data.attributes.episodeLength;

                poster = jsonObject.data.attributes.posterImage.original;
                //banner = jsonObject.data.attributes.coverImage.original;

                buttonurl = jsonObject.data.attributes.canonicalTitle
                button_alt = jsonObject.data.attributes.slug
                console.log(buttonurl)
            }
        })
    } catch (error) {
        console.log(error)
    }
    return {
        title: title,
        title_jp: title_jp,
        title_english: title_english,
        title_abr: title_abr,
        score: score,
        status: status,
        synopsis: synopsis,
        episodes: episodes,
        popularity: popularity,
        rating: rating,
        duration: duration,
        poster: poster,
        banner: banner,
        buttonurl: buttonurl,
        button_alt: button_alt,
        //genres: genres,
        //genres1: genres1,
        //genres2: genres2,
        url1: url1,
        url2: url2,
        url3: url3
    }
}
module.exports = {
    getInfo
}