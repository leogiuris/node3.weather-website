const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e6070147a33d63186e1cc73ffa7a6146/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('connection error', undefined)
        } else if(body.error) {
            callback('Unable to get forecast.', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It\'s ' + body.currently.temperature + 'º with ' + body.daily.data[0].precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast