const request = require('postman-request')

const geocode = (address, callback) => {

    const mapBox = {
        key: "pk.eyJ1IjoiY2FsbGlweWdvdXMiLCJhIjoiY2s5andsZ2Q5MW16czNscDR6amdia242ZiJ9.Mf228tFEWVePSZTipf7yUg",
        uri: `https://api.mapbox.com/geocoding/v5/mapbox.places/`,
        resultLimit: 1,
        search: address,
        apiRequest() {
            return encodeURI(`${this.uri + this.search}.json?access_token=${this.key}&limit=${this.resultLimit}`)
        }
    }

    request({uri: mapBox.apiRequest(), json: true}, (error, response) => {

        if (error) {
             callback("Couldn't connect to location server")
        }

        else if (!response.body.features || !response.body.features[0]) {
             callback("Couldnt find given location...")
        }

        else {
            let location = response.body.features[0]
            callback(undefined, {
                location: location.place_name,
                latitude: location.center[1],
                longitude: location.center[0]
            })
        }
    })
}

module.exports = geocode
