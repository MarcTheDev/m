var api = require('./api')
var json = require('./json')
var vid = require('./scrapeVid')
var verify1 = require('./verifyUrl')
var homePage = require('./home')
var getGenres = require('./getGenres')
var search = require('./search')
const express = require('express')
const cors = require('cors')
const path = require('path')
const https = require('https')
const app = express()
const port = 80

app.use(cors())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', async (req, res) => {
  var get_home = await homePage.scrapeTrending()
  res.render('index', {
    home_size: get_home.home_size,
    trending: get_home.trending,
    rating: get_home.rating,
    year: get_home.year,
    image: get_home.image,
    id: get_home.id

  })
})
app.get('/api/:query', async (req, res) => {
  // Redirects to the API Video Player ^_^
  const query = req.params.query;
  var test = await api.getApi(query)
  res.redirect("/" + test)
})
app.get('/player', (req, res) => {
  res.render('player')
})
app.get('/play/:name/:ep', async (req, res) => {
  const name = req.params.name;
  const ep = req.params.ep;
  var video_id = await vid.scrapeVid(name, ep)

  res.render('play', { 
    name: name,
    ep: ep,
    video_id: video_id.iframe,
    total: video_id.total,
    title: video_id.title
  })
})
app.get('/anime/:id', async (req, res) => {
  const id = req.params.id;
  var get_anime = await json.getInfo(id)
  var check = await verify1.verify1(get_anime.buttonurl, get_anime.button_alt)
  var get_genres = await getGenres.getGenres(id)
  res.render('anime', {
    title: get_anime.title,
    title_jp: get_anime.title_jp,
    title_english: get_anime.title_english,
    title_sys: get_anime.title_sys,
    score: get_anime.score,
    synopsis: get_anime.synopsis,
    episodes: get_anime.episodes,
    status: get_anime.status,
    popularity: get_anime.popularity,
    rating: get_anime.rating,
    duration: get_anime.duration,
    poster: get_anime.poster,
    //banner: get_anime.banner,
    buttonurl: check,
    genres: get_genres
    //genres: get_anime.genres,
    //genres1: get_anime.genres1,
    //genres2: get_anime.genres2,
    //buttonurl: get_anime.buttonurl
  })
})

app.get('/search', async (req, res) => {
  const query = req.query.q
  const res_search = await search.searchAnime(query)
  res.render("search", {
    query: query,
    home_size: res_search.home_size,
    name: res_search.name,
    rating: res_search.rating,
    year: res_search.year,
    image: res_search.image,
    id: res_search.id
  })
})

https.createServer(app).listen(port); {
  console.log("Marc Ani.me started securely.")
}

//app.listen(port, () => {
  //console.log(`MarcAni.me running on port ${port}`)
//})