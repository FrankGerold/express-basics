const path = require('path')
const express = require('express')

const app = express()

const publicPath = path.join(__dirname, '../public')

app.use(express.static(publicPath))

// app.get('', (request, response) => {
//     response.send('Ayyy lmao')
// })

// app.get('/help', (request, response) => {
//     response.send('Help Page')
// })
//
// app.get('/about', (request, response) => {
//     response.send('<h2>ABout this app</h2>')
// })

app.get('/weather', (request, response) => {
    response.send({
        location: 'HOME',
        forecast: 'cold and dank'
    })
})

app.listen(3002, () => console.log('Server running on port 3002!'))
