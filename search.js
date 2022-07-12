const requests = require('request-promise')
const { scrapeTrending } = require('./home')

var name = []
var year = []
var rating = []
var image = []
var id = []
var json_size;

async function searchAnime(query) {
    try {
        const data = await requests.get("https://kitsu.io/api/edge/anime?filter%5Btext%5D=" + query)
        const json = JSON.parse(data)
        json_size = Object.keys(json.data).length
        for (i = 0; i < json_size; i++) {
            id[i] = json.data[i].id
            name[i] = json.data[i].attributes.canonicalTitle
            rating[i] = json.data[i].attributes.averageRating
            rating[i] = rating[i] / 10
            rating[i] = rating[i].toFixed(1)
            year[i] = json.data[i].attributes.startDate
            year[i] = year[i].split("-")[0]
            image[i] = json.data[i].attributes.posterImage.original
            console.log(name[i] + " " + year[i] + " Rating: " + rating[i])
        }
    } catch(error) {
        console.log(error)
    }
    return {
        home_size: json_size,
        name: name,
        year: year,
        rating: rating,
        image: image,
        id: id
    }
}
module.exports = {
    searchAnime
}