const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZnBhdGVsIiwiYSI6ImNrMXZmOXVieDE0emEzZ3FtMWlheDZpc2sifQ.zsgbTGEayY_a25Gs81uV6g&limit=1`

  request({url: url, json: true}, (error, {body}) => {
    if (error) {
      callback('Unable to connect to geocoding services!', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      const [longitude, latitude] = body.features[0].center
      const placename = body.features[0].place_name
      callback(undefined, { longitude, latitude, placename })
    }
  })
}

module.exports = geocode