const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e6070147a33d63186e1cc73ffa7a6146/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('connection error', undefined)
        } else if(body.error) {
            callback('Unable to get forecast.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + 'ºC with a ' + (body.currently.precipProbability * 100) + '% chance of rain.' +' Today\'s high is '+ body.daily.data[0].temperatureHigh +'ºC with a low of ' + body.daily.data[0].temperatureLow + 'ºC.')
        }
    })
}

module.exports = forecast