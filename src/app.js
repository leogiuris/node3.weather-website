

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Leonardo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Leonardo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Leonardo'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: 'Help',
        message: 'Help article not found',
        name: 'Leonardo'
    })
})

app.get('*', (req, res) => {
    res.render("404", {
        title: '404 Page not Found',
        message: 'This page does not exist',
        name: 'Leonardo'
    })
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})
