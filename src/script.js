// getting the date and time
function updateTimeAndDay(timestamp) {
  let currentDate = new Date(timestamp);
  let hours = currentDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[currentDate.getDay()];

  return `${day} ${hours}:${minutes}`;

}

function dateAndTimeFormat(timestamp){
  let currentDate = new Date(timestamp * 1000);
  let day = currentDate.getDay();
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day];

}

//changing cities with api
function changingCities(event){
  event.preventDefault();
  let gettingInput = document.querySelector("#get-value-input");
  let city = gettingInput.value; // Get the city name from user input
  let apiKey = "537o90e3d0b69f65872t8af09d46def0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(getWeatherDetails);
  
  let cities = document.querySelector("#mainCity");
  cities.innerHTML = city.toUpperCase();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changingCities);


function getWeatherDetails(response){

  let celsiusTemperature = Math.round(response.data.temperature.current);
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let weatherDescription = response.data.condition.description;
  let weatherIcon = response.data.condition.icon_url;
  let dateFormat = updateTimeAndDay(response.data.time*1000);

  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${celsiusTemperature}°`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity: ${humidity}%`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

  let weatherDescriptionElement = document.querySelector("#condition");
  weatherDescriptionElement.innerHTML = `Weather: ${weatherDescription}`;

  let weatherIconElement = document.querySelector("#weather-icon");
  weatherIconElement.src = weatherIcon;

  let dateFormatElement = document.querySelector("#day");
  dateFormatElement.innerHTML =`Last updated: ${dateFormat}`;

  gettingForecast(response.data.coordinates);

}

// using button for current city
function showPosition(position){
    let latitude=position.coords.latitude; 
    let longitude = position.coords.longitude;
    let apiKey = "537o90e3d0b69f65872t8af09d46def0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
    .then(function(response) {
      let temperature = Math.round(response.data.temperature.current);
      let humidity = response.data.temperature.humidity;
      let windSpeed = response.data.wind.speed;
      let weatherDescription = response.data.condition.description;
      let city = response.data.city.toUpperCase();
      let weatherIcon = response.data.condition.icon_url;
      let dateFormat = updateTimeAndDay(response.data.time*1000);


    //updating on html
    let cityElement = document.querySelector("#mainCity");
    cityElement.innerHTML = city;
    let temperatureElement = document.querySelector("#main-temp");
    temperatureElement.innerHTML = `${temperature}°`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

    let weatherDescriptionElement = document.querySelector("#condition");
    weatherDescriptionElement.innerHTML = `Weather condition: ${weatherDescription}`;

    let weatherIconElement = document.querySelector("#weather-icon");
    weatherIconElement.src = weatherIcon;//for changing the src link of the icon

    let dateFormatElement = document.querySelector("#day");
    dateFormatElement.innerHTML =`Last updated: ${dateFormat}`;
    })
}
function getCurrentPos(){
    navigator.geolocation.getCurrentPosition(showPosition);//getting the actual position
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click",getCurrentPos);

//converting temperature units


function displayingFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
}

let celsiusTemperature = null;

function displayingCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayingFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayingCelsiusTemperature);


//getting forecast for the city searched

function formatDay(timestamp){
  let date = new Date(timestamp *1000);
  let day = date.getDay();
  let days = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
  return days[day];
}

function displayingForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index <6){
      forecastHTML =
        forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-day">${formatDay(forecastDay.time)}</div>
        <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" width="36px" alt="rainy-day"/>
        
        <div class="forecast-temperature">
          <span class="forecast-temperature-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
          <span class="forecast-temperature-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
        </div>
      </div>
  `;

    }    
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function gettingForecast(coordinates){
  let apiKey = "537o90e3d0b69f65872t8af09d46def0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayingForecast);
}
