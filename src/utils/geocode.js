const request = require("request")
const geocode = (address, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoicGxlZTYxIiwiYSI6ImNrcG93djZmMjBtb2cydm8zNWFmZDVveGwifQ.w7IE-Ukz-fOik20zolm7oQ&limit=1'
    request ({url:mapBoxUrl, json: true},(error, {body})=>{
        if (error) {
            callback("Map box service is unavailable", undefined)
        } else if (body.features.length === 0) {
            callback("Location is not found. Please try again", undefined)
        }
        else {
            callback(undefined, {
                //latitude: body.features[0].center[0],
                //longtitude: body.features[0].center[1],
                ret_address: body.features[0].place_name
            }
            )
        }
    })
}
module.exports=geocode

