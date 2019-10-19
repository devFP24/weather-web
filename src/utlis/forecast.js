const request = require('request')

const forecast = (data, callback) => {

  const url = `https://api.darksky.net/forecast/5361be0adc734a2996893bd67258e327/${data.latitude},${data.longitude}`

  request({url, json: true }, (error, {body}) => {
    if(error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location!', undefined)
    } else {
      const forecastData = body.currently
      callback(undefined, `It is currently ${forecastData.temperature} degress out. There is a ${forecastData.precipProbability}% chance of rain`)
    }
  })
}

module.exports = forecast