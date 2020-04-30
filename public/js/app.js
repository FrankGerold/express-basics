console.log(`Vlient-Side JS Loaded!`);

const weatherSearch = (query) => {
  return fetch(`http://localhost:3002/weather?address=${query}`)
  .then(r => r.json())
  .then(displayForecast)
}

const displayForecast = (weatherData) => {
    if (weatherData.error) {
      body.innerText = weatherData.error
    }
    else {
      body.innerHTML = `<div class='forecast'><h2>${weatherData.location}</h2>
      <p>${weatherData.full}</p>`
    }
}


const weatherForm = document.querySelector('.weather-form')
const locationField = document.querySelector('.location-field')

const body = document.querySelector('.main-text')

weatherForm.addEventListener('submit', event => {
   event.preventDefault()

   body.innerText = 'Loading Forecast...'

   let loc = locationField.value

   if (!loc) {
     body.innerText = 'Please type a location!';
   }

   else {
     weatherSearch(loc)
   }
})
