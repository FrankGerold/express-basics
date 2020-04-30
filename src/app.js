const path = require('path')

const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Set up static directory to serve
app.use(express.static(publicPath))


// Define routes
app.get('', (request, response) => {
    response.render('index', {
      title: 'Weather App',
      name: 'Frankie G',
      message: 'get the weather here lol'
    })
})

app.get('/help', (request, response) => {
    response.render('help', {
      message: 'how to use the app 1. type name',
      name: 'frank',
      title: 'Help Page'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
      title: 'about this app',
      name: 'frankie g'
    })
})

app.get('/weather', (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: 'Address is required'
    })
  }

  response.send({
      location: request.query.address,
      forecast: 'cold and dank'
  })
})

app.get('/products', (request, response) => {
  if (!request.query.search) {
    return response.send({
      error: 'Please provide a search term!'
    })
  }

  console.log(request.query);
  response.send({
    products: []
  })
})

// Error pages
app.get('/help/*', (request, response) => {
    response.render('404', {
      message: 'help article not found',
      title: 'Help Page 404'
    })
})

app.get('*', (request, response) => {
    response.render('404', {
      message: 'Page not found.',
      title: '404'
    })
})

app.listen(3002, () => console.log('Server running on port 3002!'))
