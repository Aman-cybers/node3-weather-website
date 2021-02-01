var weatherform = document.querySelector('form')
var search = document.querySelector('input')
var p1 = document.querySelector('#p1')
var p2 = document.querySelector('#p2')




weatherform.addEventListener('submit', (e) => {         //this is for not refreshing the page everythime when u click button
    e.preventDefault()

    var locationVar = search.value
    p1.textContent='Loading...'
    p2.textContent=''
    fetch('http://localhost:3000/weather?address='+locationVar+'').then((response) => {
        response.json().then((data) => {
            if(data.error){
                p1.textContent=data.error
            }else{
                p1.textContent=data.location
                p2.textContent=data.forecast+' Time : '+data.time
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
   
})