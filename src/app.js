const express = require('express')

const app = express()

app.get('', (request, response) => {
    response.send('Ayyy lmao')
})

app.get('/help', (request, response) => {
    response.send('Help Page')
})

app.listen(3002, () => console.log('Server running on port 3002!'))