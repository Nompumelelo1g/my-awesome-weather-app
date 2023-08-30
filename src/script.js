// getting the date and time
function updateTimeAndDay() {
  let currentDate = new Date();
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

  let currentDay = document.querySelector("#day");
  currentDay.innerHTML = `${day} ${hours}:${minutes}`;
}

//changing cities with api
function changingCities(event){
  event.preventDefault();

  let gettingInput = document.querySelector("#get-value-input");
  let city = gettingInput.value; // Get the city name from user input
  let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  updateTimeAndDay();

  axios.get(apiUrl).then(getWeatherDetails);

  let cities = document.querySelector("#mainCity");
  cities.innerHTML = city.toUpperCase();
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", changingCities);


function getWeatherDetails(response){
    let temperature = Math.round(response.data.main.temp);
    let humidity = response.data.main.humidity;
    let windSpeed = response.data.wind.speed;
    let weatherDescription = response.data.weather[0].description;
 
    let temperatureElement = document.querySelector("#main-temp");
    temperatureElement.innerHTML = `${temperature}°C`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

    let weatherDescriptionElement = document.querySelector("#condition");
    weatherDescriptionElement.innerHTML = `Weather: ${weatherDescription}`;



}

//using button for current city
function showPosition(position){
    let latitude=position.coords.latitude; 
    let longitude = position.coords.longitude;
    let apiKey = "6d68aadfacdd4f5163bc273049a0cf2d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
    .then(function(response) {
      let temperature = Math.round(response.data.main.temp);
      let humidity = response.data.main.humidity;
      let windSpeed = response.data.wind.speed;
      let weatherDescription = response.data.weather[0].description;
      let city = response.data.name.toUpperCase();


    //updating on html
    let cityElement = document.querySelector("#mainCity");
    cityElement.innerHTML = city;
    let temperatureElement = document.querySelector("#main-temp");
    temperatureElement.innerHTML = `${temperature}°C`;

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${humidity}%`;

    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind Speed: ${windSpeed} km/h`;

    let weatherDescriptionElement = document.querySelector("#condition");
    weatherDescriptionElement.innerHTML = `Weather: ${weatherDescription}`;
    updateTimeAndDay();
    })

}
function getCurrentPos(){
    navigator.geolocation.getCurrentPosition(showPosition);//getting the actual position
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click",getCurrentPos);


