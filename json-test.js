const {
    json
} = require('express');
const { ConsoleMessage } = require('puppeteer');
var request = require('request-promise');
var jsonObject;

async function getInfo(url) {
    var title, title_english, title_jp, title_sys, score, episodes, synopsis, aired, popularity, rating, duration, poster, banner,
        genres, url1, url2, url3, status, buttonurl = "";
    var genres = [""];
    url = "https://kitsu.io/api/edge/anime/" + url;
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
    }
    await request(url, headers, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            jsonObject = JSON.parse(body);
            title = jsonObject.data.title;
            title_jp = jsonObject.data.title_japanese;
            title_english = jsonObject.data.title_english;
            title_sys = jsonObject.data.title_synonyms;
            score = jsonObject.data.score;
            status = jsonObject.data.status;
            synopsis = jsonObject.data.synopsis
            episodes = jsonObject.data.episodes;
            if (episodes == null) {
                episodes = "Unknown";
            }
            aired = jsonObject.data.aired.string;
            popularity = "#" + jsonObject.data.popularity;
            rating = jsonObject.data.rating;
            duration = jsonObject.data.duration;

            poster = jsonObject.data.images.jpg.image_url;
            banner = jsonObject.data.trailer.images.maximum_image_url;

            gArray = Object.keys(jsonObject.data.genres).length
            for (let i = 0; i < gArray; i++) {
                console.log(jsonObject.data.genres[i].name)
                genres[i] = jsonObject.data.genres[i].name;
            }

            var url1 = title
                .replaceAll('.', '')
                .replaceAll('_', '-')
                .replaceAll('(', '')
                .replaceAll(')', '')
                .replaceAll(' ', '-')
                .replaceAll(',', '')
                .replaceAll(':', '')
                .replaceAll('---', '-')
                .toLowerCase();
            url1 = "https://goload.pro/videos/" + url1 + "-episode-1"

        }
    })
    return {
        title: title,
        title_jp: title_jp,
        title_english: title_english,
        title_sys: title_sys,
        score: score,
        status: status,
        synopsis: synopsis,
        episodes: episodes,
        aired: aired,
        popularity: popularity,
        rating: rating,
        duration: duration,
        poster: poster,
        banner: banner,
        genres: genres,
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