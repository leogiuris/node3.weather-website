const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/e6070147a33d63186e1cc73ffa7a6146/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, response) => {
        if (error) {
            callback('connection error', undefined)
        } else if(response.body.error) {
            callback('Unable to get forecast.', undefined)
        } else {
            callback(undefined, response.body.currently.summary + ' and it\'s ' + response.body.currently.temperature + ' degrees')
        }
    })
}

module.exports = forecast