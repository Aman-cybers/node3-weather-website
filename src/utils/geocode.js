const request = require('postman-request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYW1hbmFtYW5zc3MiLCJhIjoiY2tqaGh6MW52MHp2eTJ4bzczcnB2dmE3OCJ9.qe9tyAi2Pmhs95rCQvFG1A&limit=1'
    request({url:url , json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        }else if(response.body.features.length === 0) {
            callback('Unable to find location, Try again',undefined)
        }else{
            callback(undefined, {
                longitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1],
                location : response.body.features[0].text
            })
        }
    })
}
module.exports = geocode
