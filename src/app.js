 const express = require("express")
const path = require("path")
 const app = express()
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")
const port = process.env.PORT || 3000
const dir = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("view engine","hbs")
app.set("views",viewPath)
hbs.registerPartials(partialsPath)
app.use(express.static(dir))
app.get('',(req,res)=>{ //go to root
    res.render("index", {
        title: 'weather app',
        name: 'Hannah Lee'
    })
})
app.get('/about',(req,res)=>{ 
    res.render("about", {
        title: 'About',
        name: 'Hannah Lee'
    })
})
app.get('/help',(req,res)=>{ 
    res.render("help", {
        title: 'Help Page',
        name: 'Hannah Lee',
        helpText: 'Help page contains useful information'
    })
})
app.get('/weather',(req,res)=>{ 
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    const place_name = req.query.address
    geocode(req.query.address, (error, {latitude,longtitude,ret_address}={}) => {
        if (error){
           return console.log(error)
        } 
    
        forecast(place_name, (error, forecastData)=>{
            if (error){
                console.log(error)
            } else {
                res.send({
                    forecast: forecastData,
                    location: ret_address
                })
            }
        })
    })       
    
})
app.get('/help/*',(req,res)=>{ 
    res.render("help_notfound", {
        title: '404 not found',
        name: 'Hannah Lee',
        message: 'Help article not found'
    })
})

app.get('*',(req,res)=>{ 
    res.render("page_notfound", {
        title: '404 not found',
        name: 'Hannah Lee',
        message: 'Page not found'
    })
})

app.listen(port,()=>{
    console.log(`Express starts on port ${port}`)
})
