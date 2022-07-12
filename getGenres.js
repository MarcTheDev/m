const axios = require('axios')
const requests = require('request-promise')

var genreArray = []

async function getGenres(id) {
    try {
        var genre_url = "https://kitsu.io/api/edge/anime/" + id + "/genres"
        var data = await requests(genre_url)
        console.log(data)
        var json = JSON.parse(data)
        var genreLength = Object.keys(json.data).length
        console.log(genreLength)
        for(var i = 0; i < genreLength; i++) {
            console.log(genreArray)
            genreArray[i] = json.data[i].attributes.name
        }
    } catch (error) {
        console.log(error)
    }
    //genreArray = genreArray.toString().replaceAll(",", ", ")
    return genreArray
}
module.exports = {
    getGenres
}
