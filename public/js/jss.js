var weatherform = document.querySelector('form')
var search = document.querySelector('input')
var p1 = document.querySelector('#p1')
var p2 = document.querySelector('#p2')
var p3 = document.querySelector('#p3')
var p4 = document.querySelector('#p4')
var p5 = document.querySelector('#p5')
var p6 = document.querySelector('#p6')








weatherform.addEventListener('submit', (e) => {         //this is for not refreshing the page everythime when u click button
    e.preventDefault()

    var locationVar = search.value
    p6.textContent='Loading...'
    
    fetch('/weather?address='+locationVar+'').then((response) => {
        response.json().then((data) => {
            if(data.error){
                p6.textContent=data.error
                
                
            }else{
                p6.textContent=''
                p1.textContent =data.location
                p2.textContent = data.country
                p3.textContent= data.forecast
                p4.textContent = data.time
                p5.textContent=data.weather_description
            }
        })
    })
   
})