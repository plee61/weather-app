console.log("javascript file is loaded")

const form = document.querySelector('form')
const site = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


form.addEventListener("submit", (event)=>{
    event.preventDefault()
    message1.textContent = 'loading ....'
    message2.textContent = ""
    fetch("/weather?address="+site.value).then((response)=>{
        
        response.json().then((data)=>{
            if (data.error){
                message1.textContent = data.error
                message2.textContent = ""
            }
            else {
                message1.textContent = `${data.location}`
                message2.textContent = `${data.forecast.description}. temperature ${data.forecast.temperature} degree celcius. Chances of rain is ${data.forecast.rain}. Wind speed is ${data.forecast.wind} KM/H`
            }
        })
    })
})