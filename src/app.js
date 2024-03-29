const path = require('path')

const express = require('express')
const hbs = require('hbs')

// IMporting other js files
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3002

// Wanted to try using es2016 module syntax, too many errors
// internally with the random node packages and dependencies.
// Even tho it's
// supported in node14 i guess moest software is still using
// commonjs in the node ecosystem
// import path from 'path'
// import express from 'express'
// import hbs from 'hbs'

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

//  Weather page will implement the Weather CLI app
app.get('/weather', (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: 'Address is required!'
    })
  }

  let address = request.query.address

  // Copy this from weather app,
  geocode(address, (error, geocodeData) => {
    if (error) {
      return response.send(
        {
          error
        }
      )
    }

    forecast(geocodeData, (error, forecastData) => {
      if (error) {
        return response.send({error})
      }

      let full = forecastData.result()

      response.send({
        ...forecastData,
        full
      })
    })
  })
})



app.get('/products', (request, response) => {
  if (!request.query.search) {
    return response.send({
      error: 'Please provide a search term!'
    })
  }
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

app.listen(port, () => console.log(`Server running on port ${port}!`))
