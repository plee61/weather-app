const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=54374c3a5ff1d718f6c53f9e5317afee&query=" + latitude +','+ longtitude + "?units=f"

    request({url:url, json: true},(error, {body})=>{

        if (error){
            callback("weather stack service is unavailable", undefined)
        } else if (body.error){
            callback("weather location is not available", undefined)
        } else {
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                temperature: body.current.temperature,
                rain: body.current.precip}
            )
        }
    })
    
}
module.exports=forecast
