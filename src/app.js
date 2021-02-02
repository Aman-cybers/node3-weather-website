const path = require('path')
const geocode = require('./utils/geocode')
const express = require('express')
const weatherstack = require('./utils/weatherstack')
const hbs = require('hbs')

console.log(__dirname)

console.log(path.join(__dirname,'../public'))
const app = express()
const port = process.env.PORT || 3000

//define path for express config
const viewsPath = path.join(__dirname,'../templates/views')
const publicDirectory = path.join(__dirname,'../public')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectory))

//This handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)         //partials


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'Aman'
    })
})
app.get('/about',(req,res) => {
    res.render('about')
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send('Please provide the Location!')
    }else{
        geocode(req.query.address,(error,data)=>{
            if(error){
                return res.send({error})
            }
              const {latitude,longitude,location} = data                              //destructuring the objects
                 weatherstack(latitude,longitude,(error,forecastdata)=>{
                     if(error){
                         return res.send({error})
                     }
                     res.send({
                         location: location,
                         forecast : forecastdata.temperature +' degree',
                         time : forecastdata.time,
                         weather_description : forecastdata.weather_description,
                         country : forecastdata.country
                     })
               })
        })
        
        
    }
    
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'your help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404 page not found!'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port '+port)
})