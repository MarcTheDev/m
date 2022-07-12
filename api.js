const axios = require('axios')

async function getApi(url) {
    var marcanime;
    var apiurl = btoa(url + "LTXs3GrU8we9O" + btoa(url))
    var Url = "https://animixplay.to/api/live" + apiurl;
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'
        }
    };
    await axios.get(Url, axiosConfig).then(resp =>{
        first = resp.request.res.responseUrl;
        marcanime = "player" + first.split("https://plyr.link/p/player.html").pop();
    })
    return marcanime
}
module.exports = {
    getApi
}
