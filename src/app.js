const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utlis/geocode')
const forecast = require('./utlis/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and view loc.
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve..
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Ferin Patel'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Ferin Patel'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    msg: 'Sample help text',
    name: 'Ferin Patel'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'You must provide a search address'
    })
  }

  geocode(req.query.address, (error, data) => {
    if(error) {
      return res.send({error})
    }
    
    forecast(data, (error, forecast) => {
      if(error) {
        return res.send({error})
      }
  
      res.send({
        forecast,
        location: data.placename,
        address: req.query.address
      })
  
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404page', {
    title: '404',
    error: 'Help Article not found',
    name: 'Ferin Patel'
  })
})

app.get('*', (req, res) => {
  res.render('404page', {
    title: '404',
    error: 'My 404 Page',
    name: 'Ferin Patel'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})