function dateFormatted(date) {
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let dayReal = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayReal];

  return `${days[dayReal]}, ${hours}:${minutes}`;
}
let dateElement = document.querySelector("#date");
let current = new Date();
let searchForm = document.querySelector("#search-form");

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let searchInput = document.querySelector("#search-input");
  cityElement.innerHTML = searchInput.value;
}

searchForm.addEventListener("submit", search);

dateElement.innerHTML = dateFormatted(current);

//Homework week 5
function showTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.weather[0].main
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "3b70e492ff2c915146ecf3bc58ab42de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function clickSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchCity(city);
}

let cityInput = document.querySelector("#search-form");
cityInput.addEventListener("submit", clickSubmit);

function searchHere(position) {
  let apiKey = "3b70e492ff2c915146ecf3bc58ab42de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;

  axios.get(apiUrl).then(showTemperature);
}

function handlePosition(position) {
  let apiKey = "3b70e492ff2c915146ecf3bc58ab42de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Montreal");

//function showPosition(position) {
// let apiKey = "3b70e492ff2c915146ecf3bc58ab42de";
//let lat = position.coords.latitude;
//let lon = position.coords.longitude;
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
//axios.get(apiUrl).then(showTemperature);
//}

//navigator.geolocation.getCurrentPosition(showPosition);

//function changeHeader() {
//let h1 = document.querySelector("h1");
//h1.innerHTML = `In ${response.data.name}, it is ${temperature}°😀`;
//}
