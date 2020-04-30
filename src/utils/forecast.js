const request = require('postman-request')

const forecast = (location, callback) => {

    const weatherStackRequest = {
        url: 'http://api.weatherstack.com/current',
        apiKey: 'ab904fc7fce97ee1d90e837958baa66b',
        location: encodeURIComponent(`${location.latitude},${location.longitude}`),
        units: 'f',
        apiRequest() {
            return (this.url + '?access_key=' + this.apiKey + '&query=' + this.location + '&units=' + this.units)
        }
    }

    request({uri: weatherStackRequest.apiRequest(), json: true}, (error, response) => {
        // let data = JSON.parse(response.body)

        if (error) {
            callback("Couldn't connect to weather service!")
        } else if (response.body.error) {
            callback("Couldn't find given location!")
        } else {
            let data = response.body
            callback(undefined, {
                location: data.location.name,
                description: data.current.weather_descriptions[0],
                currentTemp: data.current.temperature,
                tempFeels: data.current.feelslike,
                precip: data.current.precip,
                result() {
                    return `In ${this.location}, it is ${this.description}. The temperature is ${this.currentTemp} degrees, and it feels more like ${this.tempFeels}. There is a ${this.precip}% chance of rain.`
                }
            })
        }
    })
}

module.exports = forecast