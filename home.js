const requests = require('request-promise')

var trending = []
var year = []
var rating = []
var image = []
var id = []
var json_size;

async function scrapeTrending() {
    try {
        const data = await requests.get("https://kitsu.io/api/edge/trending/anime")
        const json = JSON.parse(data)
        json_size = Object.keys(json.data).length
        for (i = 0; i < json_size; i++) {
            id[i] = json.data[i].id
            trending[i] = json.data[i].attributes.canonicalTitle
            rating[i] = json.data[i].attributes.averageRating
            rating[i] = rating[i] / 10
            rating[i] = rating[i].toFixed(1)
            year[i] = json.data[i].attributes.startDate
            year[i] = year[i].split("-")[0]
            image[i] = json.data[i].attributes.posterImage.original
            console.log(trending[i] + " " + year[i] + " Rating: " + rating[i])
        }
    } catch(error) {
        console.log(error)
    }
    return {
        home_size: json_size,
        trending: trending,
        year: year,
        rating: rating,
        image: image,
        id: id
    }
}
module.exports = {
    scrapeTrending
}