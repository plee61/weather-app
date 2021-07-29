console.log("javascript file is loaded")

const form = document.querySelector('form')
const site = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

form.addEventListener("submit", (event)=>{
    event.preventDefault()
    message1.textContent = 'loading ....'
    message2.textContent = ""
    fetch("http://localhost:3000/weather?address="+site.value).then((response)=>{
        
        response.json().then((data)=>{
            if (data.error){
                message1.textContent = data.error
            }
            else {
                console.log(data)
                message1.textContent = `Location ${data.location} .forecast: ${data.forecast.description}`
            }
        })
    })
})