const request = require('postman-request')
const weatherstack = (latitude,longitude,callback) =>{
   const url = 'http://api.weatherstack.com/current?access_key=5d204c3c666f2a362d95dffa2850bf3d&query=' +latitude+ ',' +longitude+ ''
   request({url : url , json : true},(error,response)=>{
       if(error){
           callback('Unable to reach check your internet',undefined)
       }else if(response.body.error) {
           callback('Unable to detect please change the input',undefined)
       }else{
           callback(undefined,{
               temperature : response.body.current.temperature,
               time:response.body.location.localtime,
               weather_description : response.body.current.weather_descriptions[0]
           })
       }
   })

}
module.exports = weatherstack