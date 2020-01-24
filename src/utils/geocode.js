const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibGVvZ2l1cmlzIiwiYSI6ImNrNWRjZGVqMDF2ZjIzZW8xdnRpa243aTMifQ.34-QqlvyWcEsf-_mQm_deQ'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('deu ruim na conexao', undefined)
        } else if(body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            //console.log(response.body.features[0])
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode



